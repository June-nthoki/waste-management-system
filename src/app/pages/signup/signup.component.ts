import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-signup',
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
            <h1 class="text-2xl font-bold text-neutral-800 mb-2">Join WasteFlow</h1>
            <p class="text-neutral-600">Create your account to start making a difference</p>
          </div>

          <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name" class="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                formControlName="name"
                class="form-input"
                [class.border-error-500]="isFieldInvalid('name')"
                placeholder="Enter your full name"
              >
              <div *ngIf="isFieldInvalid('name')" class="text-error-600 text-sm mt-1">
                Full name is required
              </div>
            </div>

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
                <span *ngIf="signupForm.get('email')?.errors?.['required']">Email is required</span>
                <span *ngIf="signupForm.get('email')?.errors?.['email']">Please enter a valid email</span>
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
                  placeholder="Create a password"
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
                <span *ngIf="signupForm.get('password')?.errors?.['required']">Password is required</span>
                <span *ngIf="signupForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                formControlName="confirmPassword"
                class="form-input"
                [class.border-error-500]="isFieldInvalid('confirmPassword')"
                placeholder="Confirm your password"
              >
              <div *ngIf="isFieldInvalid('confirmPassword')" class="text-error-600 text-sm mt-1">
                <span *ngIf="signupForm.get('confirmPassword')?.errors?.['required']">Please confirm your password</span>
                <span *ngIf="signupForm.get('confirmPassword')?.errors?.['mismatch']">Passwords do not match</span>
              </div>
            </div>

            <div class="form-group">
              <label for="role" class="form-label">Account Type</label>
              <select
                id="role"
                formControlName="role"
                class="form-input"
                [class.border-error-500]="isFieldInvalid('role')"
              >
                <option value="">Select account type</option>
                <option value="user">Citizen / Resident</option>
                <option value="waste_team">Waste Management Team</option>
              </select>
              <div *ngIf="isFieldInvalid('role')" class="text-error-600 text-sm mt-1">
                Please select an account type
              </div>
              <p class="text-sm text-neutral-500 mt-2">
                Citizens can report waste issues, while team members can manage cleanup tasks.
              </p>
            </div>

            <div class="form-group">
              <label class="flex items-start space-x-3">
                <input
                  type="checkbox"
                  formControlName="acceptTerms"
                  class="mt-1"
                >
                <span class="text-sm text-neutral-600">
                  I agree to the 
                  <a routerLink="/terms" class="text-primary-600 hover:text-primary-700">Terms of Service</a>
                  and 
                  <a routerLink="/privacy" class="text-primary-600 hover:text-primary-700">Privacy Policy</a>
                </span>
              </label>
              <div *ngIf="isFieldInvalid('acceptTerms')" class="text-error-600 text-sm mt-1">
                You must accept the terms and conditions
              </div>
            </div>

            <div *ngIf="errorMessage" class="alert alert-error">
              <span class="material-icons text-sm">error</span>
              {{ errorMessage }}
            </div>

            <div *ngIf="successMessage" class="alert alert-success">
              <span class="material-icons text-sm">check_circle</span>
              {{ successMessage }}
            </div>

            <button
              type="submit"
              [disabled]="signupForm.invalid || isLoading"
              class="btn btn-primary w-full"
            >
              <span *ngIf="isLoading" class="spinner mr-2"></span>
              <span class="material-icons mr-2" *ngIf="!isLoading">person_add</span>
              {{ isLoading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-neutral-600">
              Already have an account?
              <a routerLink="/login" class="text-primary-600 hover:text-primary-700 font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    
    return null;
  }

  isFieldInvalid(field: string): boolean {
    const fieldControl = this.signupForm.get(field);
    return !!(fieldControl && fieldControl.invalid && fieldControl.touched);
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { confirmPassword, acceptTerms, ...signupData } = this.signupForm.value;

      this.authService.signup(signupData).subscribe({
        next: (response) => {
          this.successMessage = 'Account created successfully! Redirecting to dashboard...';
          setTimeout(() => {
            this.authService.setAuthData(response);
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Signup failed. Please try again.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}