import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-submit-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="min-h-screen bg-neutral-50 py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <div class="card p-8">
            <div class="text-center mb-8">
              <h1 class="text-3xl font-bold text-neutral-800 mb-2">Report Waste Issue</h1>
              <p class="text-neutral-600">Help keep our community clean by reporting waste management issues</p>
            </div>

            <form [formGroup]="feedbackForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="description" class="form-label">Description *</label>
                <textarea
                  id="description"
                  formControlName="description"
                  class="form-input form-textarea"
                  [class.border-error-500]="isFieldInvalid('description')"
                  placeholder="Describe the waste issue in detail..."
                  rows="4"
                ></textarea>
                <div *ngIf="isFieldInvalid('description')" class="text-error-600 text-sm mt-1">
                  Description is required
                </div>
              </div>

              <div class="form-group">
                <label for="category" class="form-label">Category *</label>
                <select
                  id="category"
                  formControlName="category"
                  class="form-input"
                  [class.border-error-500]="isFieldInvalid('category')"
                >
                  <option value="">Select category</option>
                  <option value="garbage">Garbage Collection</option>
                  <option value="illegal_dumping">Illegal Dumping</option>
                  <option value="recycling">Recycling Issues</option>
                  <option value="hazardous_waste">Hazardous Waste</option>
                </select>
                <div *ngIf="isFieldInvalid('category')" class="text-error-600 text-sm mt-1">
                  Category is required
                </div>
              </div>

              <div class="form-group">
                <label for="priority" class="form-label">Priority Level</label>
                <select
                  id="priority"
                  formControlName="priority"
                  class="form-input"
                >
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div class="form-group">
                <label for="location" class="form-label">Location</label>
                <input
                  type="text"
                  id="location"
                  formControlName="location"
                  class="form-input"
                  placeholder="Enter address or location details"
                >
              </div>

              <div class="form-group">
                <label for="imageUrl" class="form-label">Image URL (Optional)</label>
                <input
                  type="url"
                  id="imageUrl"
                  formControlName="imageUrl"
                  class="form-input"
                  placeholder="https://example.com/image.jpg"
                >
                <p class="text-sm text-neutral-500 mt-2">
                  Provide a URL to an image that shows the waste issue
                </p>
              </div>

              <div *ngIf="errorMessage" class="alert alert-error">
                <span class="material-icons text-sm">error</span>
                {{ errorMessage }}
              </div>

              <div *ngIf="successMessage" class="alert alert-success">
                <span class="material-icons text-sm">check_circle</span>
                {{ successMessage }}
              </div>

              <div class="flex gap-4">
                <button
                  type="button"
                  (click)="router.navigate(['/dashboard'])"
                  class="btn btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  [disabled]="feedbackForm.invalid || isLoading"
                  class="btn btn-primary flex-1"
                >
                  <span *ngIf="isLoading" class="spinner mr-2"></span>
                  <span class="material-icons mr-2" *ngIf="!isLoading">send</span>
                  {{ isLoading ? 'Submitting...' : 'Submit Report' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SubmitFeedbackComponent {
  feedbackForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private feedbackService: FeedbackService,
    public router: Router
  ) {
    this.feedbackForm = this.fb.group({
      description: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['medium'],
      location: [''],
      imageUrl: ['']
    });
  }

  isFieldInvalid(field: string): boolean {
    const fieldControl = this.feedbackForm.get(field);
    return !!(fieldControl && fieldControl.invalid && fieldControl.touched);
  }

  onSubmit(): void {
    if (this.feedbackForm.valid && this.authService.currentUser) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const feedbackData = {
        ...this.feedbackForm.value,
        userId: this.authService.currentUser.id,
        userName: this.authService.currentUser.name,
        location: this.feedbackForm.value.location ? {
          address: this.feedbackForm.value.location
        } : undefined
      };

      this.feedbackService.createFeedback(feedbackData).subscribe({
        next: () => {
          this.successMessage = 'Report submitted successfully! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/feedback/status']);
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to submit report. Please try again.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}