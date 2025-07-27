export interface User {
  id: string;
  name: string;
  email: string;
  role: 'resident' | 'manager' | 'admin';
  flatNumber?: string;
  phoneNumber: string;
  joinDate: string;
}

export interface Property {
  id: string;
  type: 'flat' | 'house';
  bhk: 1 | 2 | 3 | 4;
  floor: number;
  area: number;
  status: 'occupied' | 'vacant' | 'maintenance';
  salePrice?: number;
  rentPrice?: number;
  owner?: string;
  tenant?: string;
}

export interface Visitor {
  id: string;
  name: string;
  phoneNumber: string;
  purpose: string;
  visitingFlat: string;
  entryTime: string;
  exitTime?: string;
  photo?: string;
  qrCode: string;
  status: 'checked-in' | 'checked-out';
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: 'plumbing' | 'electrical' | 'cleaning' | 'security' | 'maintenance' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  submittedBy: string;
  submittedDate: string;
  resolvedDate?: string;
  assignedTo?: string;
}

export interface Payment {
  id: string;
  residentId: string;
  amount: number;
  type: 'maintenance' | 'registration' | 'penalty' | 'other';
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  paidDate?: string;
  description: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'agm' | 'committee' | 'general' | 'emergency';
  organizer: string;
  attendees: string[];
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'emergency' | 'maintenance' | 'general' | 'celebration';
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  createdDate: string;
  recipients: string[];
}