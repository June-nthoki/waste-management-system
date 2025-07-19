import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FeedbackService } from '../../services/feedback.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="min-h-screen bg-neutral-50 py-8">
      <div class="container mx-auto px-4">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-neutral-800 mb-2">Admin Panel</h1>
          <p class="text-neutral-600">Manage the waste management system</p>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600 mb-1">Total Reports</p>
                <p class="text-3xl font-bold text-neutral-800">{{ feedbackStats.total || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span class="material-icons text-primary-600">assessment</span>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600 mb-1">Pending Reports</p>
                <p class="text-3xl font-bold text-warning-600">{{ feedbackStats.pending || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                <span class="material-icons text-warning-600">pending</span>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600 mb-1">Active Tasks</p>
                <p class="text-3xl font-bold text-secondary-600">{{ taskStats.inProgress || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                <span class="material-icons text-secondary-600">autorenew</span>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600 mb-1">Resolved</p>
                <p class="text-3xl font-bold text-success-600">{{ feedbackStats.resolved || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                <span class="material-icons text-success-600">check_circle</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div class="card p-6">
            <h2 class="text-xl font-semibold text-neutral-800 mb-6">Quick Actions</h2>
            <div class="space-y-4">
              <a routerLink="/feedback" 
                 class="flex items-center p-4 border border-neutral-200 rounded-lg hover:shadow-sm hover:border-primary-300 transition-all group">
                <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-600 transition-colors">
                  <span class="material-icons text-primary-600 group-hover:text-white">feedback</span>
                </div>
                <div>
                  <h3 class="font-medium text-neutral-800">Manage Reports</h3>
                  <p class="text-sm text-neutral-600">View and manage all waste reports</p>
                </div>
              </a>
              
              <a routerLink="/admin/users" 
                 class="flex items-center p-4 border border-neutral-200 rounded-lg hover:shadow-sm hover:border-secondary-300 transition-all group">
                <div class="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary-600 transition-colors">
                  <span class="material-icons text-secondary-600 group-hover:text-white">people</span>
                </div>
                <div>
                  <h3 class="font-medium text-neutral-800">User Management</h3>
                  <p class="text-sm text-neutral-600">Manage system users and roles</p>
                </div>
              </a>
              
              <a routerLink="/admin/tasks" 
                 class="flex items-center p-4 border border-neutral-200 rounded-lg hover:shadow-sm hover:border-accent-300 transition-all group">
                <div class="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-accent-600 transition-colors">
                  <span class="material-icons text-accent-600 group-hover:text-white">assignment</span>
                </div>
                <div>
                  <h3 class="font-medium text-neutral-800">Task Management</h3>
                  <p class="text-sm text-neutral-600">Assign and monitor cleanup tasks</p>
                </div>
              </a>
            </div>
          </div>

          <!-- Category Breakdown -->
          <div class="card p-6">
            <h2 class="text-xl font-semibold text-neutral-800 mb-6">Reports by Category</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-neutral-700">Garbage Collection</span>
                <span class="font-semibold text-neutral-800">{{ feedbackStats.byCategory?.garbage || 0 }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-neutral-700">Illegal Dumping</span>
                <span class="font-semibold text-neutral-800">{{ feedbackStats.byCategory?.illegal_dumping || 0 }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-neutral-700">Recycling Issues</span>
                <span class="font-semibold text-neutral-800">{{ feedbackStats.byCategory?.recycling || 0 }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-neutral-700">Hazardous Waste</span>
                <span class="font-semibold text-neutral-800">{{ feedbackStats.byCategory?.hazardous_waste || 0 }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- System Information -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-neutral-800 mb-6">System Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-600 mb-1">96%</div>
              <div class="text-sm text-neutral-600">Resolution Rate</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-secondary-600 mb-1">2.3 days</div>
              <div class="text-sm text-neutral-600">Avg. Response Time</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-success-600 mb-1">1,234</div>
              <div class="text-sm text-neutral-600">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminPanelComponent implements OnInit {
  feedbackStats: any = {};
  taskStats: any = {};
  isLoading = true;

  constructor(
    private feedbackService: FeedbackService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    this.feedbackService.getFeedbackStats().subscribe({
      next: (stats) => {
        this.feedbackStats = stats;
        this.isLoading = false;
      }
    });

    this.taskService.getTaskStats().subscribe({
      next: (stats) => {
        this.taskStats = stats;
      }
    });
  }
}