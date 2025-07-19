import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white shadow-md border-b border-neutral-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span class="material-icons text-white text-lg">eco</span>
              </div>
              <span class="font-bold text-xl text-neutral-800">WasteFlow</span>
            </div>
          </div>

          <!-- Navigation Links -->
          <nav class="hidden md:flex items-center space-x-6" *ngIf="currentUser">
            <a routerLink="/dashboard" 
               routerLinkActive="text-primary-600"
               class="text-neutral-600 hover:text-primary-600 font-medium transition-colors">
              Dashboard
            </a>
            
            <a routerLink="/feedback/submit" 
               routerLinkActive="text-primary-600"
               class="text-neutral-600 hover:text-primary-600 font-medium transition-colors"
               *ngIf="currentUser.role === 'user'">
              Report Issue
            </a>
            
            <a routerLink="/feedback/status" 
               routerLinkActive="text-primary-600"
               class="text-neutral-600 hover:text-primary-600 font-medium transition-colors"
               *ngIf="currentUser.role === 'user'">
              My Reports
            </a>
            
            <a routerLink="/tasks" 
               routerLinkActive="text-primary-600"
               class="text-neutral-600 hover:text-primary-600 font-medium transition-colors"
               *ngIf="currentUser.role === 'waste_team'">
              My Tasks
            </a>
            
            <a routerLink="/admin" 
               routerLinkActive="text-primary-600"
               class="text-neutral-600 hover:text-primary-600 font-medium transition-colors"
               *ngIf="currentUser.role === 'admin'">
              Admin Panel
            </a>
          </nav>

          <!-- User Menu -->
          <div class="flex items-center space-x-4" *ngIf="currentUser; else guestMenu">
            <!-- Notifications -->
            <div class="relative">
              <button (click)="showNotifications = !showNotifications" 
                      class="relative p-2 text-neutral-600 hover:text-primary-600 transition-colors">
                <span class="material-icons">notifications</span>
                <span *ngIf="(unreadCount$ | async)! > 0" 
                      class="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {{ unreadCount$ | async }}
                </span>
              </button>
              
              <!-- Notifications Dropdown -->
              <div *ngIf="showNotifications" 
                   class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
                <div class="p-4 border-b border-neutral-200">
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-neutral-800">Notifications</h3>
                    <button (click)="markAllAsRead()" 
                            class="text-sm text-primary-600 hover:text-primary-700">
                      Mark all read
                    </button>
                  </div>
                </div>
                <div class="max-h-96 overflow-y-auto">
                  <div *ngFor="let notification of notifications" 
                       class="p-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                       [class.bg-primary-50]="!notification.readStatus">
                    <div class="flex items-start space-x-3">
                      <div class="flex-shrink-0">
                        <span class="material-icons text-lg"
                              [ngClass]="{
                                'text-primary-600': notification.type === 'info',
                                'text-success-600': notification.type === 'success',
                                'text-warning-600': notification.type === 'warning',
                                'text-error-600': notification.type === 'error'
                              }">
                          {{ getNotificationIcon(notification.type) }}
                        </span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-neutral-800">
                          {{ notification.title }}
                        </p>
                        <p class="text-sm text-neutral-600 mt-1">
                          {{ notification.message }}
                        </p>
                        <p class="text-xs text-neutral-400 mt-2">
                          {{ formatDate(notification.createdAt) }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div *ngIf="notifications.length === 0" 
                       class="p-4 text-center text-neutral-500">
                    No notifications
                  </div>
                </div>
              </div>
            </div>

            <!-- User Profile -->
            <div class="relative">
              <button (click)="showUserMenu = !showUserMenu" 
                      class="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors">
                <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-medium">
                    {{ currentUser.name.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <span class="hidden md:block text-sm font-medium text-neutral-700">
                  {{ currentUser.name }}
                </span>
                <span class="material-icons text-sm text-neutral-500">keyboard_arrow_down</span>
              </button>
              
              <!-- User Dropdown -->
              <div *ngIf="showUserMenu" 
                   class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
                <div class="p-2">
                  <div class="px-3 py-2 text-sm text-neutral-500">
                    {{ currentUser.email }}
                  </div>
                  <div class="px-3 py-1 text-xs text-neutral-400 capitalize">
                    {{ currentUser.role.replace('_', ' ') }}
                  </div>
                </div>
                <hr class="border-neutral-200">
                <div class="p-2">
                  <button (click)="logout()" 
                          class="w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded transition-colors">
                    <span class="material-icons text-sm mr-2">logout</span>
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Guest Menu -->
          <ng-template #guestMenu>
            <div class="flex items-center space-x-4">
              <a routerLink="/login" class="btn btn-outline btn-sm">
                Sign In
              </a>
              <a routerLink="/signup" class="btn btn-primary btn-sm">
                Sign Up
              </a>
            </div>
          </ng-template>

          <!-- Mobile Menu Button -->
          <button class="md:hidden p-2 text-neutral-600 hover:text-primary-600" 
                  (click)="showMobileMenu = !showMobileMenu">
            <span class="material-icons">menu</span>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div *ngIf="showMobileMenu && currentUser" 
             class="md:hidden py-4 border-t border-neutral-200">
          <nav class="space-y-2">
            <a routerLink="/dashboard" 
               (click)="showMobileMenu = false"
               class="block px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded transition-colors">
              Dashboard
            </a>
            <a routerLink="/feedback/submit" 
               (click)="showMobileMenu = false"
               class="block px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded transition-colors"
               *ngIf="currentUser.role === 'user'">
              Report Issue
            </a>
            <a routerLink="/feedback/status" 
               (click)="showMobileMenu = false"
               class="block px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded transition-colors"
               *ngIf="currentUser.role === 'user'">
              My Reports
            </a>
            <a routerLink="/tasks" 
               (click)="showMobileMenu = false"
               class="block px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded transition-colors"
               *ngIf="currentUser.role === 'waste_team'">
              My Tasks
            </a>
            <a routerLink="/admin" 
               (click)="showMobileMenu = false"
               class="block px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded transition-colors"
               *ngIf="currentUser.role === 'admin'">
              Admin Panel
            </a>
          </nav>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  notifications: any[] = [];
  unreadCount$: Observable<number> = new Observable();
  showNotifications = false;
  showUserMenu = false;
  showMobileMenu = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadNotifications();
        this.unreadCount$ = this.notificationService.getUnreadCount(user.id);
      }
    });
  }

  private loadNotifications(): void {
    if (this.currentUser) {
      this.notificationService.getNotifications(this.currentUser.id).subscribe(
        notifications => this.notifications = notifications.slice(0, 10)
      );
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.showUserMenu = false;
  }

  markAllAsRead(): void {
    if (this.currentUser) {
      this.notificationService.markAllAsRead(this.currentUser.id).subscribe(() => {
        this.loadNotifications();
        this.unreadCount$ = this.notificationService.getUnreadCount(this.currentUser!.id);
      });
    }
    this.showNotifications = false;
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
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