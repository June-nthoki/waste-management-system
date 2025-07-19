import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-team-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="min-h-screen bg-neutral-50 py-8">
      <div class="container mx-auto px-4">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-neutral-800 mb-2">My Tasks</h1>
          <p class="text-neutral-600">Manage your assigned waste management tasks</p>
        </div>

        <div class="mb-6 flex flex-wrap gap-4">
          <button
            (click)="filterStatus = ''"
            [class]="filterStatus === '' ? 'btn btn-primary' : 'btn btn-outline'"
          >
            All Tasks ({{ tasks.length }})
          </button>
          <button
            (click)="filterStatus = 'assigned'"
            [class]="filterStatus === 'assigned' ? 'btn btn-warning' : 'btn btn-outline'"
          >
            Assigned ({{ getAssignedCount() }})
          </button>
          <button
            (click)="filterStatus = 'in_progress'"
            [class]="filterStatus === 'in_progress' ? 'btn btn-secondary' : 'btn btn-outline'"
          >
            In Progress ({{ getInProgressCount() }})
          </button>
          <button
            (click)="filterStatus = 'completed'"
            [class]="filterStatus === 'completed' ? 'btn btn-success' : 'btn btn-outline'"
          >
            Completed ({{ getCompletedCount() }})
          </button>
        </div>

        <div class="space-y-6" *ngIf="getFilteredTasks().length > 0; else noTasks">
          <div *ngFor="let task of getFilteredTasks()" class="card p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-neutral-800 mb-2">
                  {{ task.feedbackDescription }}
                </h3>
                <div class="flex flex-wrap gap-4 text-sm text-neutral-600 mb-3">
                  <span class="flex items-center">
                    <span class="material-icons text-sm mr-1">person</span>
                    Assigned by: {{ task.assignedByName }}
                  </span>
                  <span class="flex items-center">
                    <span class="material-icons text-sm mr-1">schedule</span>
                    Created: {{ formatDate(task.createdAt) }}
                  </span>
                  <span class="flex items-center">
                    <span class="material-icons text-sm mr-1">event</span>
                    Deadline: {{ formatDate(task.deadline) }}
                  </span>
                </div>
                <div *ngIf="task.instructions" class="p-3 bg-neutral-50 rounded-lg mb-3">
                  <p class="text-sm text-neutral-700">
                    <span class="font-medium">Instructions:</span> {{ task.instructions }}
                  </p>
                </div>
              </div>
              <div class="flex flex-col items-end gap-2">
                <span [class]="getStatusClass(task.status)">
                  {{ getStatusLabel(task.status) }}
                </span>
                <span [class]="getPriorityClass(task.priority)">
                  {{ task.priority }} priority
                </span>
                <span *ngIf="isOverdue(task)" class="text-error-600 text-xs font-medium">
                  OVERDUE
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4 text-sm text-neutral-500">
                <span *ngIf="task.estimatedHours">
                  Est. {{ task.estimatedHours }}h
                </span>
                <span *ngIf="task.actualHours">
                  Actual: {{ task.actualHours }}h
                </span>
              </div>
              <div class="flex gap-2">
                <button
                  *ngIf="task.status === 'assigned'"
                  (click)="updateTaskStatus(task.id, 'in_progress')"
                  class="btn btn-secondary btn-sm"
                >
                  <span class="material-icons text-sm mr-1">play_arrow</span>
                  Start Task
                </button>
                <button
                  *ngIf="task.status === 'in_progress'"
                  (click)="updateTaskStatus(task.id, 'completed')"
                  class="btn btn-success btn-sm"
                >
                  <span class="material-icons text-sm mr-1">check</span>
                  Mark Complete
                </button>
                <a [routerLink]="['/feedback', task.feedbackId]" class="btn btn-outline btn-sm">
                  <span class="material-icons text-sm mr-1">visibility</span>
                  View Details
                </a>
              </div>
            </div>

            <div *ngIf="task.completionNotes" class="mt-4 p-3 bg-success-50 rounded-lg">
              <p class="text-sm text-success-700">
                <span class="font-medium">Completion Notes:</span> {{ task.completionNotes }}
              </p>
            </div>
          </div>
        </div>

        <ng-template #noTasks>
          <div class="card p-12 text-center">
            <span class="material-icons text-6xl text-neutral-300 mb-4 block">assignment</span>
            <h3 class="text-xl font-semibold text-neutral-600 mb-2">
              {{ getEmptyStateMessage() }}
            </h3>
            <p class="text-neutral-500 mb-6">
              {{ getEmptyStateDescription() }}
            </p>
            <a routerLink="/dashboard" class="btn btn-primary">
              <span class="material-icons mr-2">dashboard</span>
              Back to Dashboard
            </a>
          </div>
        </ng-template>
      </div>
    </div>
  `
})
export class TeamTasksComponent implements OnInit {
  tasks: Task[] = [];
  filterStatus = '';
  isLoading = true;

  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadUserTasks();
  }

  private loadUserTasks(): void {
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      this.taskService.getTasksByUser(currentUser.id).subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  getFilteredTasks(): Task[] {
    if (!this.filterStatus) return this.tasks;
    return this.tasks.filter(t => t.status === this.filterStatus);
  }

  getAssignedCount(): number {
    return this.tasks.filter(t => t.status === 'assigned').length;
  }

  getInProgressCount(): number {
    return this.tasks.filter(t => t.status === 'in_progress').length;
  }

  getCompletedCount(): number {
    return this.tasks.filter(t => t.status === 'completed').length;
  }

  updateTaskStatus(taskId: string, status: 'in_progress' | 'completed'): void {
    this.taskService.updateTask(taskId, { status }).subscribe({
      next: () => {
        this.loadUserTasks();
      }
    });
  }

  isOverdue(task: Task): boolean {
    return new Date(task.deadline) < new Date() && task.status !== 'completed';
  }

  getStatusLabel(status: string): string {
    return status.replace('_', ' ').toUpperCase();
  }

  getStatusClass(status: string): string {
    const classes = {
      'assigned': 'status-badge status-pending',
      'in_progress': 'status-badge status-in-progress',
      'completed': 'status-badge status-resolved',
      'on_hold': 'status-badge status-rejected'
    };
    return classes[status as keyof typeof classes] || 'status-badge';
  }

  getPriorityClass(priority: string): string {
    const classes = {
      'urgent': 'text-error-600 font-medium text-xs',
      'high': 'text-warning-600 font-medium text-xs',
      'medium': 'text-secondary-600 text-xs',
      'low': 'text-neutral-500 text-xs'
    };
    return classes[priority as keyof typeof classes] || 'text-xs';
  }

  getEmptyStateMessage(): string {
    if (this.filterStatus) {
      return `No ${this.filterStatus.replace('_', ' ')} tasks`;
    }
    return 'No tasks assigned yet';
  }

  getEmptyStateDescription(): string {
    if (this.filterStatus) {
      return `You don't have any tasks with ${this.filterStatus.replace('_', ' ')} status.`;
    }
    return 'Tasks will appear here when they are assigned to you by administrators.';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}