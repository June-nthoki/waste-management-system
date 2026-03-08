import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback, Comment } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="min-h-screen bg-neutral-50 py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div *ngIf="feedback" class="space-y-6">
            <!-- Header -->
            <div class="card p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h1 class="text-2xl font-bold text-neutral-800 mb-2">
                    {{ feedback.description }}
                  </h1>
                  <div class="flex flex-wrap gap-4 text-sm text-neutral-600">
                    <span class="flex items-center">
                      <span class="material-icons text-sm mr-1">person</span>
                      {{ feedback.userName }}
                    </span>
                    <span class="flex items-center">
                      <span class="material-icons text-sm mr-1">category</span>
                      {{ getCategoryLabel(feedback.category) }}
                    </span>
                    <span class="flex items-center">
                      <span class="material-icons text-sm mr-1">schedule</span>
                      {{ formatDate(feedback.createdAt) }}
                    </span>
                  </div>
                </div>
                <div class="flex flex-col items-end gap-2">
                  <span [class]="getStatusClass(feedback.status)">
                    {{ getStatusLabel(feedback.status) }}
                  </span>
                  <span [class]="getPriorityClass(feedback.priority)">
                    {{ feedback.priority }} priority
                  </span>
                </div>
              </div>

              <div *ngIf="feedback.location?.address" class="mb-4 p-3 bg-neutral-50 rounded-lg">
                <p class="text-sm text-neutral-700">
                  <span class="material-icons text-sm mr-1">location_on</span>
                  {{ feedback.location?.address }}
                </p>
              </div>

              <div *ngIf="feedback.imageUrl" class="mb-4">
                <img [src]="feedback.imageUrl" [alt]="feedback.description" 
                     class="w-full max-w-md h-64 object-cover rounded-lg">
              </div>

              <div *ngIf="feedback.assignedToName" class="p-4 bg-secondary-50 rounded-lg">
                <h3 class="font-semibold text-secondary-800 mb-2">Assignment Details</h3>
                <p class="text-sm text-secondary-700 mb-1">
                  <span class="material-icons text-sm mr-1">person</span>
                  Assigned to: {{ feedback.assignedToName }}
                </p>
                <p *ngIf="feedback.estimatedResolution" class="text-sm text-secondary-600">
                  <span class="material-icons text-sm mr-1">event</span>
                  Estimated completion: {{ formatDate(feedback.estimatedResolution) }}
                </p>
              </div>
            </div>

            <!-- Comments Section -->
            <div class="card p-6">
              <h2 class="text-xl font-semibold text-neutral-800 mb-6">Updates & Comments</h2>
              
              <div class="space-y-4" *ngIf="comments.length > 0; else noComments">
                <div *ngFor="let comment of comments" 
                     class="border-l-4 border-primary-200 pl-4 py-3">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-2">
                      <span class="font-medium text-neutral-800">{{ comment.userName }}</span>
                      <span class="text-xs px-2 py-1 bg-neutral-100 rounded-full text-neutral-600 capitalize">
                        {{ comment.userRole.replace('_', ' ') }}
                      </span>
                    </div>
                    <span class="text-sm text-neutral-500">
                      {{ formatDate(comment.createdAt) }}
                    </span>
                  </div>
                  <p class="text-neutral-700">{{ comment.message }}</p>
                  <div *ngIf="comment.imageUrl" class="mt-3">
                    <img [src]="comment.imageUrl" [alt]="'Update image'" 
                         class="w-full max-w-sm h-32 object-cover rounded-lg">
                  </div>
                </div>
              </div>

              <ng-template #noComments>
                <div class="text-center py-8 text-neutral-500">
                  <span class="material-icons text-4xl mb-2 block">chat_bubble_outline</span>
                  <p>No updates or comments yet</p>
                </div>
              </ng-template>
            </div>
          </div>

          <div *ngIf="!feedback && !isLoading" class="card p-12 text-center">
            <span class="material-icons text-6xl text-neutral-300 mb-4 block">error_outline</span>
            <h3 class="text-xl font-semibold text-neutral-600 mb-2">Report Not Found</h3>
            <p class="text-neutral-500 mb-6">The requested report could not be found.</p>
            <a routerLink="/dashboard" class="btn btn-primary">
              <span class="material-icons mr-2">arrow_back</span>
              Back to Dashboard
            </a>
          </div>

          <div *ngIf="isLoading" class="card p-12 text-center">
            <div class="spinner mx-auto mb-4"></div>
            <p class="text-neutral-600">Loading report details...</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FeedbackDetailComponent implements OnInit {
  feedback: Feedback | null = null;
  comments: Comment[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFeedbackDetail(id);
      this.loadComments(id);
    }
  }

  private loadFeedbackDetail(id: string): void {
    this.feedbackService.getFeedbackById(id).subscribe({
      next: (feedback) => {
        this.feedback = feedback || null;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private loadComments(feedbackId: string): void {
    this.feedbackService.getComments(feedbackId).subscribe({
      next: (comments) => {
        this.comments = comments;
      }
    });
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
      'urgent': 'text-error-600 font-medium text-sm',
      'high': 'text-warning-600 font-medium text-sm',
      'medium': 'text-secondary-600 text-sm',
      'low': 'text-neutral-500 text-sm'
    };
    return classes[priority as keyof typeof classes] || 'text-sm';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}