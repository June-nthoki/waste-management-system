export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  readStatus: boolean;
  createdAt: Date;
  actionUrl?: string;
  metadata?: {
    feedbackId?: string;
    taskId?: string;
    userId?: string;
  };
}