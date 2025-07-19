export interface Task {
  id: string;
  feedbackId: string;
  feedbackDescription: string;
  assignedTo: string;
  assignedToName: string;
  assignedBy: string;
  assignedByName: string;
  status: 'assigned' | 'in_progress' | 'completed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
  instructions?: string;
  completionNotes?: string;
  completionImages?: string[];
  estimatedHours?: number;
  actualHours?: number;
}

export interface TaskUpdate {
  status?: 'assigned' | 'in_progress' | 'completed' | 'on_hold';
  completionNotes?: string;
  completionImages?: string[];
  actualHours?: number;
}