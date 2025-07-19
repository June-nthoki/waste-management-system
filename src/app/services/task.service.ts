import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task, TaskUpdate } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadDemoData();
  }

  private loadDemoData(): void {
    const demoTasks: Task[] = [
      {
        id: '1',
        feedbackId: '2',
        feedbackDescription: 'Construction debris dumped in park area',
        assignedTo: '3',
        assignedToName: 'Waste Team Lead',
        assignedBy: '1',
        assignedByName: 'Admin User',
        status: 'in_progress',
        priority: 'urgent',
        deadline: new Date(Date.now() + 86400000 * 2),
        createdAt: new Date(Date.now() - 86400000 * 1),
        updatedAt: new Date(Date.now() - 86400000 * 1),
        instructions: 'Remove all construction debris from Central Park north section. Coordinate with park management.',
        estimatedHours: 8
      },
      {
        id: '2',
        feedbackId: '1',
        feedbackDescription: 'Large pile of garbage bags on sidewalk',
        assignedTo: '3',
        assignedToName: 'Waste Team Lead',
        assignedBy: '1',
        assignedByName: 'Admin User',
        status: 'assigned',
        priority: 'high',
        deadline: new Date(Date.now() + 86400000 * 1),
        createdAt: new Date(Date.now() - 86400000 * 0.5),
        updatedAt: new Date(Date.now() - 86400000 * 0.5),
        instructions: 'Collect garbage bags from 123 Main Street. Check for recurring dumping.',
        estimatedHours: 2
      }
    ];

    this.tasksSubject.next(demoTasks);
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasksSubject.value).pipe(delay(500));
  }

  getTasksByUser(userId: string): Observable<Task[]> {
    const userTasks = this.tasksSubject.value.filter(t => t.assignedTo === userId);
    return of(userTasks).pipe(delay(500));
  }

  getTaskById(id: string): Observable<Task | undefined> {
    const task = this.tasksSubject.value.find(t => t.id === id);
    return of(task).pipe(delay(300));
  }

  createTask(taskData: Partial<Task>): Observable<Task> {
    const newTask: Task = {
      id: Date.now().toString(),
      feedbackId: taskData.feedbackId!,
      feedbackDescription: taskData.feedbackDescription!,
      assignedTo: taskData.assignedTo!,
      assignedToName: taskData.assignedToName!,
      assignedBy: taskData.assignedBy!,
      assignedByName: taskData.assignedByName!,
      status: 'assigned',
      priority: taskData.priority || 'medium',
      deadline: taskData.deadline!,
      createdAt: new Date(),
      updatedAt: new Date(),
      instructions: taskData.instructions,
      estimatedHours: taskData.estimatedHours
    };

    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([newTask, ...currentTasks]);

    return of(newTask).pipe(delay(1000));
  }

  updateTask(id: string, updates: TaskUpdate): Observable<Task> {
    const currentTasks = this.tasksSubject.value;
    const index = currentTasks.findIndex(t => t.id === id);
    
    if (index !== -1) {
      const updatedTask = {
        ...currentTasks[index],
        ...updates,
        updatedAt: new Date()
      };
      currentTasks[index] = updatedTask;
      this.tasksSubject.next([...currentTasks]);
      return of(updatedTask).pipe(delay(500));
    }

    throw new Error('Task not found');
  }

  getTaskStats(): Observable<any> {
    const tasks = this.tasksSubject.value;
    const stats = {
      total: tasks.length,
      assigned: tasks.filter(t => t.status === 'assigned').length,
      inProgress: tasks.filter(t => t.status === 'in_progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      onHold: tasks.filter(t => t.status === 'on_hold').length,
      overdue: tasks.filter(t => new Date(t.deadline) < new Date() && t.status !== 'completed').length,
      byPriority: {
        low: tasks.filter(t => t.priority === 'low').length,
        medium: tasks.filter(t => t.priority === 'medium').length,
        high: tasks.filter(t => t.priority === 'high').length,
        urgent: tasks.filter(t => t.priority === 'urgent').length
      }
    };

    return of(stats).pipe(delay(500));
  }
}