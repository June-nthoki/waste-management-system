import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component.ts').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component.ts').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component.ts').then(m => m.SignupComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component.ts').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'feedback',
    children: [
      {
        path: 'submit',
        loadComponent: () => import('./pages/feedback/submit-feedback.component.ts').then(m => m.SubmitFeedbackComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['user'] }
      },
      {
        path: 'status',
        loadComponent: () => import('./pages/feedback/feedback-status.component.ts').then(m => m.FeedbackStatusComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['user'] }
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/feedback/feedback-detail.component.ts').then(m => m.FeedbackDetailComponent),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks/team-tasks.component.ts').then(m => m.TeamTasksComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['waste_team'] }
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin-panel.component.ts').then(m => m.AdminPanelComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'waste-tips',
    loadComponent: () => import('./pages/waste-tips/waste-tips.component.ts').then(m => m.WasteTipsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];