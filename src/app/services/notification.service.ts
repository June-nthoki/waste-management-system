import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor() {
    this.loadDemoData();
  }

  private loadDemoData(): void {
    const demoNotifications: Notification[] = [
      {
        id: '1',
        userId: '2',
        title: 'Feedback Status Updated',
        message: 'Your report about construction debris has been assigned to our waste team.',
        type: 'info',
        readStatus: false,
        createdAt: new Date(Date.now() - 86400000 * 1),
        actionUrl: '/feedback/2',
        metadata: { feedbackId: '2' }
      },
      {
        id: '2',
        userId: '3',
        title: 'New Task Assigned',
        message: 'You have been assigned a new high-priority cleanup task.',
        type: 'warning',
        readStatus: false,
        createdAt: new Date(Date.now() - 86400000 * 0.5),
        actionUrl: '/tasks/1',
        metadata: { taskId: '1' }
      },
      {
        id: '3',
        userId: '2',
        title: 'Report Resolved',
        message: 'Your recycling bin overflow report has been successfully resolved.',
        type: 'success',
        readStatus: true,
        createdAt: new Date(Date.now() - 86400000 * 3),
        actionUrl: '/feedback/3',
        metadata: { feedbackId: '3' }
      }
    ];

    this.notificationsSubject.next(demoNotifications);
  }

  getNotifications(userId: string): Observable<Notification[]> {
    const userNotifications = this.notificationsSubject.value
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return of(userNotifications).pipe(delay(500));
  }

  getUnreadCount(userId: string): Observable<number> {
    const unreadCount = this.notificationsSubject.value
      .filter(n => n.userId === userId && !n.readStatus).length;
    
    return of(unreadCount).pipe(delay(300));
  }

  markAsRead(notificationId: string): Observable<boolean> {
    const notifications = this.notificationsSubject.value;
    const notification = notifications.find(n => n.id === notificationId);
    
    if (notification) {
      notification.readStatus = true;
      this.notificationsSubject.next([...notifications]);
    }
    
    return of(true).pipe(delay(300));
  }

  markAllAsRead(userId: string): Observable<boolean> {
    const notifications = this.notificationsSubject.value;
    notifications.forEach(n => {
      if (n.userId === userId) {
        n.readStatus = true;
      }
    });
    
    this.notificationsSubject.next([...notifications]);
    return of(true).pipe(delay(500));
  }

  createNotification(notification: Partial<Notification>): Observable<Notification> {
    const newNotification: Notification = {
      id: Date.now().toString(),
      userId: notification.userId!,
      title: notification.title!,
      message: notification.message!,
      type: notification.type || 'info',
      readStatus: false,
      createdAt: new Date(),
      actionUrl: notification.actionUrl,
      metadata: notification.metadata
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([newNotification, ...currentNotifications]);

    return of(newNotification).pipe(delay(300));
  }

  deleteNotification(notificationId: string): Observable<boolean> {
    const notifications = this.notificationsSubject.value
      .filter(n => n.id !== notificationId);
    
    this.notificationsSubject.next(notifications);
    return of(true).pipe(delay(300));
  }
}