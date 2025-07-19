import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full">
        <div class="card p-8">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-white text-2xl">eco</span>
            </div>
            <h1 class="text-2xl font-bold text-neutral-800 mb-2">Welcome Back</h1>
            <p class="text-neutral-600">Sign in to your WasteFlow account</p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                formControlName="email"
                class="form-input"
                [class.border-error-500]="isFieldInvalid('email')"
                placeholder="Enter your email"
              >
              <div *ngIf="isFieldInvalid('email')" class="text-error-600 text-sm mt-1">
                <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</span>
                <span *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</span>
              </div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <div class="relative">
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  id="password"
                  formControlName="password"
                  class="form-input pr-10"
                  [class.border-error-500]="isFieldInvalid('password')"
                  placeholder="Enter your password"
                >
                <button
                  type="button"
                  (click)="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                >
                  <span class="material-icons text-sm">
                    {{ showPassword ? 'visibility_off' : 'visibility' }}
                  </span>
                </button>
              </div>
              <div *ngIf="isFieldInvalid('password')" class="text-error-600 text-sm mt-1">
                Password is required
              </div>
            </div>

            <div *ngIf="errorMessage" class="alert alert-error">
              <span class="material-icons text-sm">error</span>
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              [disabled]="loginForm.invalid || isLoading"
              class="btn btn-primary w-full"
            >
              <span *ngIf="isLoading" class="spinner mr-2"></span>
              <span class="material-icons mr-2" *ngIf="!isLoading">login</span>
              {{ isLoading ? 'Signing In...' : 'Sign In' }}
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-neutral-600">
              Don't have an account?
              <a routerLink="/signup" class="text-primary-600 hover:text-primary-700 font-medium">
                Sign up
              </a>
            </p>
          </div>

          <!-- Demo Credentials -->
          <div class="mt-8 p-4 bg-neutral-50 rounded-lg">
            <h3 class="font-semibold text-neutral-800 mb-2">Demo Credentials</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-neutral-600">Admin:</span>
                <button (click)="fillDemo('admin')" class="text-primary-600 hover:text-primary-700">
                admin&#64;waste.com / password
                </button>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">User:</span>
                <button (click)="fillDemo('user')" class="text-primary-600 hover:text-primary-700">
                  user@waste.com / password
                </button>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Team:</span>
                <button (click)="fillDemo('team')" class="text-primary-600 hover:text-primary-700">
                  team@waste.com / password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string): boolean {
    const fieldControl = this.loginForm.get(field);
    return !!(fieldControl && fieldControl.invalid && fieldControl.touched);
  }

  fillDemo(type: string): void {
    const demoCredentials = {
      admin: { email: 'admin@waste.com', password: 'password' },
      user: { email: 'user@waste.com', password: 'password' },
      team: { email: 'team@waste.com', password: 'password' },
    };

    const credentials = demoCredentials[type as keyof typeof demoCredentials];
    this.loginForm.patchValue(credentials);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.authService.setAuthData(response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage =
            error.message || 'Login failed. Please try again.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
