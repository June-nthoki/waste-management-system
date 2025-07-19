import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, LoginCredentials, SignupData, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private tokenKey = 'waste_management_token';
  private userKey = 'waste_management_user';

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem(this.tokenKey);
    const userData = localStorage.getItem(this.userKey);
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
      } catch (error) {
        this.logout();
      }
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Demo users for testing
    const demoUsers: User[] = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@waste.com',
        role: 'admin',
        createdAt: new Date(),
        isActive: true
      },
      {
        id: '2',
        name: 'John Citizen',
        email: 'user@waste.com',
        role: 'user',
        createdAt: new Date(),
        isActive: true
      },
      {
        id: '3',
        name: 'Waste Team Lead',
        email: 'team@waste.com',
        role: 'waste_team',
        createdAt: new Date(),
        isActive: true
      }
    ];

    // Demo password is "password" for all users
    if (credentials.password !== 'password') {
      return throwError(() => new Error('Invalid email or password'));
    }

    const user = demoUsers.find(u => u.email === credentials.email);
    if (!user) {
      return throwError(() => new Error('Invalid email or password'));
    }

    const token = 'demo_token_' + user.id;
    const response: AuthResponse = { user, token };

    return of(response).pipe(
      delay(1000), // Simulate network delay
    );
  }

  signup(signupData: SignupData): Observable<AuthResponse> {
    const newUser: User = {
      id: Date.now().toString(),
      name: signupData.name,
      email: signupData.email,
      role: signupData.role,
      createdAt: new Date(),
      isActive: true
    };

    const token = 'demo_token_' + newUser.id;
    const response: AuthResponse = { user: newUser, token };

    return of(response).pipe(
      delay(1000)
    );
  }

  setAuthData(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  get isWasteTeam(): boolean {
    return this.currentUser?.role === 'waste_team';
  }

  get isUser(): boolean {
    return this.currentUser?.role === 'user';
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}