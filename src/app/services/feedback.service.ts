import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Feedback, Comment, FeedbackFilter } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackSubject = new BehaviorSubject<Feedback[]>([]);
  public feedback$ = this.feedbackSubject.asObservable();

  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  public comments$ = this.commentsSubject.asObservable();

  constructor() {
    this.loadDemoData();
  }

  private loadDemoData(): void {
    const demoFeedback: Feedback[] = [
      {
        id: '1',
        userId: '2',
        userName: 'John Citizen',
        description: 'Large pile of garbage bags left on sidewalk for over a week. Starting to smell and attracting pests.',
        category: 'garbage',
        imageUrl: 'https://images.pexels.com/photos/2586932/pexels-photo-2586932.jpeg?auto=compress&cs=tinysrgb&w=600',
        location: {
          address: '123 Main Street, Downtown',
          latitude: 40.7128,
          longitude: -74.0060
        },
        status: 'pending',
        priority: 'high',
        createdAt: new Date(Date.now() - 86400000 * 2),
        updatedAt: new Date(Date.now() - 86400000 * 2)
      },
      {
        id: '2',
        userId: '2',
        userName: 'John Citizen',
        description: 'Construction debris dumped in park area. Includes concrete, metal scraps, and plastic materials.',
        category: 'illegal_dumping',
        imageUrl: 'https://images.pexels.com/photos/3196766/pexels-photo-3196766.jpeg?auto=compress&cs=tinysrgb&w=600',
        location: {
          address: 'Central Park, North Section'
        },
        status: 'in_progress',
        priority: 'urgent',
        createdAt: new Date(Date.now() - 86400000 * 5),
        updatedAt: new Date(Date.now() - 86400000 * 1),
        assignedTo: '3',
        assignedToName: 'Waste Team Lead',
        estimatedResolution: new Date(Date.now() + 86400000 * 2)
      },
      {
        id: '3',
        userId: '2',
        userName: 'John Citizen',
        description: 'Overflowing recycling bins need emptying. Paper and cardboard scattered around area.',
        category: 'recycling',
        status: 'resolved',
        priority: 'medium',
        createdAt: new Date(Date.now() - 86400000 * 10),
        updatedAt: new Date(Date.now() - 86400000 * 3),
        assignedTo: '3',
        assignedToName: 'Waste Team Lead'
      }
    ];

    const demoComments: Comment[] = [
      {
        id: '1',
        feedbackId: '2',
        userId: '1',
        userName: 'Admin User',
        userRole: 'admin',
        message: 'Thank you for reporting this. We have assigned this to our waste team for immediate action.',
        createdAt: new Date(Date.now() - 86400000 * 4)
      },
      {
        id: '2',
        feedbackId: '2',
        userId: '3',
        userName: 'Waste Team Lead',
        userRole: 'waste_team',
        message: 'Team dispatched to location. We will begin cleanup operations tomorrow morning.',
        createdAt: new Date(Date.now() - 86400000 * 1)
      }
    ];

    this.feedbackSubject.next(demoFeedback);
    this.commentsSubject.next(demoComments);
  }

  getFeedback(filter?: FeedbackFilter): Observable<Feedback[]> {
    let feedback = this.feedbackSubject.value;

    if (filter) {
      if (filter.status) {
        feedback = feedback.filter(f => f.status === filter.status);
      }
      if (filter.category) {
        feedback = feedback.filter(f => f.category === filter.category);
      }
      if (filter.priority) {
        feedback = feedback.filter(f => f.priority === filter.priority);
      }
      if (filter.assignedTo) {
        feedback = feedback.filter(f => f.assignedTo === filter.assignedTo);
      }
    }

    return of(feedback).pipe(delay(500));
  }

  getFeedbackById(id: string): Observable<Feedback | undefined> {
    const feedback = this.feedbackSubject.value.find(f => f.id === id);
    return of(feedback).pipe(delay(300));
  }

  getUserFeedback(userId: string): Observable<Feedback[]> {
    const userFeedback = this.feedbackSubject.value.filter(f => f.userId === userId);
    return of(userFeedback).pipe(delay(500));
  }

  createFeedback(feedbackData: Partial<Feedback>): Observable<Feedback> {
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      userId: feedbackData.userId!,
      userName: feedbackData.userName!,
      description: feedbackData.description!,
      category: feedbackData.category!,
      imageUrl: feedbackData.imageUrl,
      location: feedbackData.location,
      status: 'pending',
      priority: feedbackData.priority || 'medium',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const currentFeedback = this.feedbackSubject.value;
    this.feedbackSubject.next([newFeedback, ...currentFeedback]);

    return of(newFeedback).pipe(delay(1000));
  }

  updateFeedback(id: string, updates: Partial<Feedback>): Observable<Feedback> {
    const currentFeedback = this.feedbackSubject.value;
    const index = currentFeedback.findIndex(f => f.id === id);
    
    if (index !== -1) {
      const updatedFeedback = {
        ...currentFeedback[index],
        ...updates,
        updatedAt: new Date()
      };
      currentFeedback[index] = updatedFeedback;
      this.feedbackSubject.next([...currentFeedback]);
      return of(updatedFeedback).pipe(delay(500));
    }

    throw new Error('Feedback not found');
  }

  getComments(feedbackId: string): Observable<Comment[]> {
    const comments = this.commentsSubject.value.filter(c => c.feedbackId === feedbackId);
    return of(comments).pipe(delay(300));
  }

  addComment(comment: Partial<Comment>): Observable<Comment> {
    const newComment: Comment = {
      id: Date.now().toString(),
      feedbackId: comment.feedbackId!,
      userId: comment.userId!,
      userName: comment.userName!,
      userRole: comment.userRole!,
      message: comment.message!,
      imageUrl: comment.imageUrl,
      createdAt: new Date()
    };

    const currentComments = this.commentsSubject.value;
    this.commentsSubject.next([...currentComments, newComment]);

    return of(newComment).pipe(delay(500));
  }

  getFeedbackStats(): Observable<any> {
    const feedback = this.feedbackSubject.value;
    const stats = {
      total: feedback.length,
      pending: feedback.filter(f => f.status === 'pending').length,
      inProgress: feedback.filter(f => f.status === 'in_progress').length,
      resolved: feedback.filter(f => f.status === 'resolved').length,
      rejected: feedback.filter(f => f.status === 'rejected').length,
      byCategory: {
        garbage: feedback.filter(f => f.category === 'garbage').length,
        illegal_dumping: feedback.filter(f => f.category === 'illegal_dumping').length,
        recycling: feedback.filter(f => f.category === 'recycling').length,
        hazardous_waste: feedback.filter(f => f.category === 'hazardous_waste').length
      },
      byPriority: {
        low: feedback.filter(f => f.priority === 'low').length,
        medium: feedback.filter(f => f.priority === 'medium').length,
        high: feedback.filter(f => f.priority === 'high').length,
        urgent: feedback.filter(f => f.priority === 'urgent').length
      }
    };

    return of(stats).pipe(delay(500));
  }
}