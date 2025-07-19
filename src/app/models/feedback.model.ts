export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  description: string;
  category: 'garbage' | 'illegal_dumping' | 'recycling' | 'hazardous_waste';
  imageUrl?: string;
  location?: {
    address: string;
    latitude?: number;
    longitude?: number;
  };
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  assignedToName?: string;
  estimatedResolution?: Date;
}

export interface Comment {
  id: string;
  feedbackId: string;
  userId: string;
  userName: string;
  userRole: string;
  message: string;
  imageUrl?: string;
  createdAt: Date;
}

export interface FeedbackFilter {
  status?: string;
  category?: string;
  priority?: string;
  dateFrom?: Date;
  dateTo?: Date;
  assignedTo?: string;
}