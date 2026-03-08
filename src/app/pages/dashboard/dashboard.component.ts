import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { FeedbackService } from '../../services/feedback.service';
import { TaskService } from '../../services/task.service';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../models/user.model';
import { Feedback } from '../../models/feedback.model';
import { Task } from '../../models/task.model';
import 'src/global_styles.css';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="min-h-screen bg-neutral-50">
      <!-- Welcome Section -->
      <div class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div class="container mx-auto px-4 py-12">
          <div class="max-w-4xl">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">
              Welcome back, {{ currentUser?.name }}!
            </h1>
            <p class="text-primary-100 text-lg mb-6">
              {{ getDashboardWelcomeMessage() }}
            </p>
            <div class="flex flex-wrap gap-4">
              <a *ngIf="currentUser?.role === 'user'" 
                 routerLink="/feedback/submit" 
                 class="btn bg-white text-primary-600 hover:bg-primary-50">
                <span class="material-icons mr-2">add_circle</span>
                Report New Issue
              </a>
              <a *ngIf="currentUser?.role === 'waste_team'" 
                 routerLink="/tasks" 
                 class="btn bg-white text-primary-600 hover:bg-primary-50">
                <span class="material-icons mr-2">assignment</span>
                View My Tasks
              </a>
              <a *ngIf="currentUser?.role === 'admin'" 
                 routerLink="/admin" 
                 class="btn bg-white text-primary-600 hover:bg-primary-50">
                <span class="material-icons mr-2">admin_panel_settings</span>
                Admin Panel
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600 mb-1">
                  {{ getStatsLabel('total') }}
                </p>
                <p class="text-3xl font-bold text-neutral-800">
                  {{ stats.total || 0 }}
                </p>
              </div>
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span class="material-icons text-primary-600">{{ getStatsIcon('total') }}</span>
              </div>
            </div>
          </div>

          <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600 mb-1">
                  {{ getStatsLabel('pending') }}
                </p>
                <p class="text-3xl font-bold text-warning-600">
                  {{ stats.pending || 0 }}
                </p>
              </div>
              <div class="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                <span class="material-icons text-warning-600">{{ getStatsIcon('pending') }}</span>
              </div>
            </div>
          </div>

          <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600 mb-1">
                  {{ getStatsLabel('progress') }}
                </p>
                <p class="text-3xl font-bold text-secondary-600">
                  {{ stats.inProgress || 0 }}
                </p>
              </div>
              <div class="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                <span class="material-icons text-secondary-600">{{ getStatsIcon('progress') }}</span>
              </div>
            </div>
          </div>

          <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600 mb-1">
                  {{ getStatsLabel('completed') }}
                </p>
                <p class="text-3xl font-bold text-success-600">
                  {{ stats.resolved || stats.completed || 0 }}
                </p>
              </div>
              <div class="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                <span class="material-icons text-success-600">{{ getStatsIcon('completed') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Items -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-neutral-800">
                {{ getRecentItemsTitle() }}
              </h2>
              <a [routerLink]="getRecentItemsLink()" 
                 class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </a>
            </div>
            
            <div class="space-y-4" *ngIf="recentItems.length > 0; else noItems">
              <div *ngFor="let item of recentItems" 
                   class="border border-neutral-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="font-medium text-neutral-800 line-clamp-2">
                    {{ getItemTitle(item) }}
                  </h3>
                  <span [class]="getStatusClass(getItemStatus(item))">
                    {{ getItemStatus(item) }}
                  </span>
                </div>
                <p class="text-sm text-neutral-600 mb-3 line-clamp-2">
                  {{ getItemDescription(item) }}
                </p>
                <div class="flex items-center justify-between text-xs text-neutral-500">
                  <span>{{ formatDate(getItemDate(item)) }}</span>
                  <span *ngIf="getItemPriority(item)" 
                        [class]="getPriorityClass(getItemPriority(item))">
                    {{ getItemPriority(item) }} priority
                  </span>
                </div>
              </div>
            </div>
            
            <ng-template #noItems>
              <div class="text-center py-8 text-neutral-500">
                <span class="material-icons text-4xl mb-2 block">{{ getEmptyStateIcon() }}</span>
                <p>{{ getEmptyStateMessage() }}</p>
              </div>
            </ng-template>
          </div>

          <!-- Quick Actions -->
          <div class="card p-6">
            <h2 class="text-xl font-semibold text-neutral-800 mb-6">Quick Actions</h2>
            <div class="space-y-4">
              <ng-container *ngIf="currentUser?.role === 'user'">
                <a routerLink="/feedback/submit" 
                   class="flex items-center p-4 border border-neutral-200 rounded-lg hover:shadow-sm hover:border-primary-300 transition-all group">
                  <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-600 transition-colors">
                    <span class="material-icons text-primary-600 group-hover:text-white">add_circle</span>
                  </div>
                  <div>
                    <h3 class="font-medium text-neutral-800">Report Waste Issue</h3>
                    <p class="text-sm text-neutral-600">Submit a new waste management report</p>
                  </div>
                </a>
                
                <a routerLink="/feedback/status" 
                   class="flex items-center p-4 border border-neutral-200 rounded-lg hover:shadow-sm hover:border-secondary-300 transition-all group">
                  <div class="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary-600 transition-colors">
                    <span class="material-icons text-secondary-600 group-hover:text-white">track_changes</span>
                  </div>
                  <div>
                    <h3 class="font-medium text-neutral-800">Track My Reports</h3>
                    <p class="text-sm text-neutral-600">View status of your submitted reports</p>
                  </div>
                </a>
              </ng-container>

              <ng-container *ngIf="currentUser?.role === 'waste_team'">
                <a routerLink="/tasks" 
                   class="flex items-center p-4 border border-neutral-200 rounded-lg hover:shadow-sm hover:border-primary-300 transition-all group">
                  <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-600 transition-colors">
                    <span class="material-icons text-primary-600 group-hover:text-white">assignment</span>
                  </div>
                  <div>
                    <h3 class="font-medium text-neutral-800">View My Tasks</h3>
                    <p class="text-sm text-neutral-600">See assigned cleanup tasks</p>
                  </div>
                </a>
                
                <a routerLink="/feedback" 
                   class="flex items-center p-4 border border-neutral-200 rounded-lg hover:shadow-sm hover:border-secondary-300 transition-all group">
                  <div class="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary-600 transition-colors">
                    <span class="material-icons text-secondary-600 group-hover:text-white">feedback</span>
                  </div>
                  <div>
                    <h3 class="font-medium text-neutral-800">View All Reports</h3>
                    <p class="text-sm text-neutral-600">Browse community waste reports</p>
                  </div>
                </a>
              </ng-container>

              <ng-container *ngIf="currentUser?.role === 'admin'">
                <a routerLink="/admin/users" 
                   class="flex items-center p-4 border border-neutral-200 rounded-lg hover:shadow-sm hover:border-primary-300 transition-all group">
                  <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-600 transition-colors">
                    <span class="material-icons text-primary-600 group-hover:text-white">people</span>
                  </div>
                  <div>
                    <h3 class="font-medium text-neutral-800">Manage Users</h3>
                    <p class="text-sm text-neutral-600">View and manage system users</p>
                  </div>
                </a>
                
                <a routerLink="/admin/reports" 
                   class="flex items-center p-4 border border-neutral-200 rounded-lg hover:shadow-sm hover:border-secondary-300 transition-all group">
                  <div class="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary-600 transition-colors">
                    <span class="material-icons text-secondary-600 group-hover:text-white">analytics</span>
                  </div>
                  <div>
                    <h3 class="font-medium text-neutral-800">System Reports</h3>
                    <p class="text-sm text-neutral-600">Generate and view system analytics</p>
                  </div>
                </a>
              </ng-container>

              <a routerLink="/waste-tips" 
                 class="flex items-center p-4 border border-neutral-200 rounded-lg hover:shadow-sm hover:border-accent-300 transition-all group">
                <div class="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-accent-600 transition-colors">
                  <span class="material-icons text-accent-600 group-hover:text-white">lightbulb</span>
                </div>
                <div>
                  <h3 class="font-medium text-neutral-800">Waste Management Tips</h3>
                  <p class="text-sm text-neutral-600">Learn best practices for waste disposal</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  stats: any = {};
  recentItems: any[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private feedbackService: FeedbackService,
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    if (!this.currentUser) return;

    if (this.currentUser.role === 'user') {
      this.loadUserDashboard();
    } else if (this.currentUser.role === 'waste_team') {
      this.loadTeamDashboard();
    } else if (this.currentUser.role === 'admin') {
      this.loadAdminDashboard();
    }
  }

  private loadUserDashboard(): void {
    this.feedbackService.getUserFeedback(this.currentUser!.id).subscribe(feedback => {
      this.stats = {
        total: feedback.length,
        pending: feedback.filter(f => f.status === 'pending').length,
        inProgress: feedback.filter(f => f.status === 'in_progress').length,
        resolved: feedback.filter(f => f.status === 'resolved').length
      };
      this.recentItems = feedback.slice(0, 5);
      this.isLoading = false;
    });
  }

  private loadTeamDashboard(): void {
    this.taskService.getTasksByUser(this.currentUser!.id).subscribe(tasks => {
      this.stats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'assigned').length,
        inProgress: tasks.filter(t => t.status === 'in_progress').length,
        completed: tasks.filter(t => t.status === 'completed').length
      };
      this.recentItems = tasks.slice(0, 5);
      this.isLoading = false;
    });
  }

  private loadAdminDashboard(): void {
    this.feedbackService.getFeedbackStats().subscribe(feedbackStats => {
      this.taskService.getTaskStats().subscribe(taskStats => {
        this.stats = {
          total: feedbackStats.total,
          pending: feedbackStats.pending,
          inProgress: feedbackStats.inProgress,
          resolved: feedbackStats.resolved
        };
        this.isLoading = false;
      });
    });

    this.feedbackService.getFeedback().subscribe(feedback => {
      this.recentItems = feedback.slice(0, 5);
    });
  }

  getDashboardWelcomeMessage(): string {
    switch (this.currentUser?.role) {
      case 'admin':
        return 'Monitor system performance and manage waste management operations from your admin dashboard.';
      case 'waste_team':
        return 'View your assigned tasks and update cleanup progress to keep the community clean.';
      case 'user':
        return 'Report waste issues in your community and track their resolution progress.';
      default:
        return 'Welcome to your dashboard.';
    }
  }

  getStatsLabel(type: string): string {
    const labels = {
      user: {
        total: 'Total Reports',
        pending: 'Pending',
        progress: 'In Progress',
        completed: 'Resolved'
      },
      waste_team: {
        total: 'Total Tasks',
        pending: 'Assigned',
        progress: 'In Progress',
        completed: 'Completed'
      },
      admin: {
        total: 'Total Reports',
        pending: 'Pending',
        progress: 'In Progress',
        completed: 'Resolved'
      }
    };

    return labels[this.currentUser?.role as keyof typeof labels]?.[type as keyof typeof labels.user] || type;
  }

  getStatsIcon(type: string): string {
    const icons = {
      total: 'assessment',
      pending: 'pending',
      progress: 'autorenew',
      completed: 'check_circle'
    };
    return icons[type as keyof typeof icons] || 'help';
  }

  getRecentItemsTitle(): string {
    switch (this.currentUser?.role) {
      case 'admin':
        return 'Recent Reports';
      case 'waste_team':
        return 'Recent Tasks';
      case 'user':
        return 'My Recent Reports';
      default:
        return 'Recent Items';
    }
  }

  getRecentItemsLink(): string {
    switch (this.currentUser?.role) {
      case 'admin':
        return '/admin/feedback';
      case 'waste_team':
        return '/tasks';
      case 'user':
        return '/feedback/status';
      default:
        return '/';
    }
  }

  getItemTitle(item: any): string {
    if (item.feedbackDescription) {
      // It's a task
      return item.feedbackDescription;
    }
    // It's feedback
    return item.description;
  }

  getItemDescription(item: any): string {
    if (item.feedbackDescription) {
      // It's a task
      return `Assigned to: ${item.assignedToName}`;
    }
    // It's feedback
    return `Category: ${item.category?.replace('_', ' ') || 'Not specified'}`;
  }

  getItemStatus(item: any): string {
    return item.status?.replace('_', ' ') || 'Unknown';
  }

  getItemDate(item: any): Date {
    return item.createdAt || new Date();
  }

  getItemPriority(item: any): string {
    return item.priority || '';
  }

  getStatusClass(status: string): string {
    const statusClasses = {
      'pending': 'status-badge status-pending',
      'assigned': 'status-badge status-pending',
      'in progress': 'status-badge status-in-progress',
      'resolved': 'status-badge status-resolved',
      'completed': 'status-badge status-resolved',
      'rejected': 'status-badge status-rejected'
    };
    return statusClasses[status as keyof typeof statusClasses] || 'status-badge';
  }

  getPriorityClass(priority: string): string {
    const priorityClasses = {
      'urgent': 'text-error-600 font-medium',
      'high': 'text-warning-600 font-medium',
      'medium': 'text-secondary-600',
      'low': 'text-neutral-500'
    };
    return priorityClasses[priority as keyof typeof priorityClasses] || '';
  }

  getEmptyStateIcon(): string {
    switch (this.currentUser?.role) {
      case 'admin':
        return 'assessment';
      case 'waste_team':
        return 'assignment';
      case 'user':
        return 'feedback';
      default:
        return 'inbox';
    }
  }

  getEmptyStateMessage(): string {
    switch (this.currentUser?.role) {
      case 'admin':
        return 'No recent reports to display';
      case 'waste_team':
        return 'No tasks assigned yet';
      case 'user':
        return 'No reports submitted yet';
      default:
        return 'No items to display';
    }
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return new Date(date).toLocaleDateString();
  }
}