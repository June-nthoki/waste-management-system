import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-status',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="min-h-screen bg-neutral-50 py-8">
      <div class="container mx-auto px-4">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-neutral-800 mb-2">My Reports</h1>
          <p class="text-neutral-600">Track the status of your submitted waste reports</p>
        </div>

        <div class="mb-6 flex flex-wrap gap-4">
          <button
            (click)="filterStatus = ''"
            [class]="filterStatus === '' ? 'btn btn-primary' : 'btn btn-outline'"
          >
            All Reports ({{ feedback.length }})
          </button>
          <button
            (click)="filterStatus = 'pending'"
            [class]="filterStatus === 'pending' ? 'btn btn-warning' : 'btn btn-outline'"
          >
            Pending ({{ getPendingCount() }})
          </button>
          <button
            (click)="filterStatus = 'in_progress'"
            [class]="filterStatus === 'in_progress' ? 'btn btn-secondary' : 'btn btn-outline'"
          >
            In Progress ({{ getInProgressCount() }})
          </button>
          <button
            (click)="filterStatus = 'resolved'"
            [class]="filterStatus === 'resolved' ? 'btn btn-success' : 'btn btn-outline'"
          >
            Resolved ({{ getResolvedCount() }})
          </button>
        </div>

        <div class="space-y-6" *ngIf="getFilteredFeedback().length > 0; else noReports">
          <div *ngFor="let item of getFilteredFeedback()" class="card p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-neutral-800 mb-2">
                  {{ item.description }}
                </h3>
                <div class="flex flex-wrap gap-4 text-sm text-neutral-600">
                  <span class="flex items-center">
                    <span class="material-icons text-sm mr-1">category</span>
                    {{ getCategoryLabel(item.category) }}
                  </span>
                  <span class="flex items-center">
                    <span class="material-icons text-sm mr-1">schedule</span>
                    {{ formatDate(item.createdAt) }}
                  </span>
                  <span *ngIf="item.location?.address" class="flex items-center">
                  <span class="material-icons text-sm mr-1">location_on</span>
                  {{ item.location?.address }}
                  </span>
                </div>
              </div>
              <div class="flex flex-col items-end gap-2">
                <span [class]="getStatusClass(item.status)">
                  {{ getStatusLabel(item.status) }}
                </span>
                <span [class]="getPriorityClass(item.priority)">
                  {{ item.priority }} priority
                </span>
              </div>
            </div>

            <div *ngIf="item.imageUrl" class="mb-4">
              <img [src]="item.imageUrl" [alt]="item.description" 
                   class="w-full h-48 object-cover rounded-lg">
            </div>

            <div *ngIf="item.assignedToName" class="mb-4 p-3 bg-secondary-50 rounded-lg">
              <p class="text-sm text-secondary-700">
                <span class="material-icons text-sm mr-1">person</span>
                Assigned to: {{ item.assignedToName }}
              </p>
              <p *ngIf="item.estimatedResolution" class="text-sm text-secondary-600 mt-1">
                <span class="material-icons text-sm mr-1">event</span>
                Estimated completion: {{ formatDate(item.estimatedResolution) }}
              </p>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm text-neutral-500">
                Last updated: {{ formatDate(item.updatedAt) }}
              </span>
              <a [routerLink]="['/feedback', item.id]" class="btn btn-outline btn-sm">
                <span class="material-icons text-sm mr-1">visibility</span>
                View Details
              </a>
            </div>
          </div>
        </div>

        <ng-template #noReports>
          <div class="card p-12 text-center">
            <span class="material-icons text-6xl text-neutral-300 mb-4 block">feedback</span>
            <h3 class="text-xl font-semibold text-neutral-600 mb-2">
              {{ getEmptyStateMessage() }}
            </h3>
            <p class="text-neutral-500 mb-6">
              {{ getEmptyStateDescription() }}
            </p>
            <a routerLink="/feedback/submit" class="btn btn-primary">
              <span class="material-icons mr-2">add_circle</span>
              Submit Your First Report
            </a>
          </div>
        </ng-template>
      </div>
    </div>
  `
})
export class FeedbackStatusComponent implements OnInit {
  feedback: Feedback[] = [];
  filterStatus = '';
  isLoading = true;

  constructor(
    private authService: AuthService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.loadUserFeedback();
  }

  private loadUserFeedback(): void {
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      this.feedbackService.getUserFeedback(currentUser.id).subscribe({
        next: (feedback) => {
          this.feedback = feedback;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  getFilteredFeedback(): Feedback[] {
    if (!this.filterStatus) return this.feedback;
    return this.feedback.filter(f => f.status === this.filterStatus);
  }

  getPendingCount(): number {
    return this.feedback.filter(f => f.status === 'pending').length;
  }

  getInProgressCount(): number {
    return this.feedback.filter(f => f.status === 'in_progress').length;
  }

  getResolvedCount(): number {
    return this.feedback.filter(f => f.status === 'resolved').length;
  }

  getCategoryLabel(category: string): string {
    const labels = {
      'garbage': 'Garbage Collection',
      'illegal_dumping': 'Illegal Dumping',
      'recycling': 'Recycling Issues',
      'hazardous_waste': 'Hazardous Waste'
    };
    return labels[category as keyof typeof labels] || category;
  }

  getStatusLabel(status: string): string {
    return status.replace('_', ' ').toUpperCase();
  }

  getStatusClass(status: string): string {
    const classes = {
      'pending': 'status-badge status-pending',
      'in_progress': 'status-badge status-in-progress',
      'resolved': 'status-badge status-resolved',
      'rejected': 'status-badge status-rejected'
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
      return `No ${this.filterStatus.replace('_', ' ')} reports`;
    }
    return 'No reports submitted yet';
  }

  getEmptyStateDescription(): string {
    if (this.filterStatus) {
      return `You don't have any reports with ${this.filterStatus.replace('_', ' ')} status.`;
    }
    return 'Start by reporting a waste issue in your community to help keep it clean.';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}