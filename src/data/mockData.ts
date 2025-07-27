import { Property, Visitor, Complaint, Payment, Meeting, Alert } from '../types';

export const mockProperties: Property[] = [
  { id: '1', type: 'flat', bhk: 2, floor: 1, area: 1200, status: 'occupied', salePrice: 4500000, rentPrice: 25000, owner: 'Rajesh Kumar' },
  { id: '2', type: 'flat', bhk: 3, floor: 2, area: 1500, status: 'vacant', salePrice: 5500000, rentPrice: 35000 },
  { id: '3', type: 'flat', bhk: 1, floor: 3, area: 800, status: 'occupied', salePrice: 3200000, rentPrice: 18000, owner: 'Sunita Verma' },
  { id: '4', type: 'house', bhk: 4, floor: 0, area: 2000, status: 'vacant', salePrice: 8500000, rentPrice: 55000 },
  { id: '5', type: 'flat', bhk: 2, floor: 4, area: 1100, status: 'maintenance', salePrice: 4200000, rentPrice: 24000 },
  { id: '6', type: 'flat', bhk: 3, floor: 1, area: 1400, status: 'occupied', salePrice: 5200000, rentPrice: 32000, owner: 'Amit Singh' },
];

export const mockVisitors: Visitor[] = [
  {
    id: '1',
    name: 'Deepak Gupta',
    phoneNumber: '+91 9876543213',
    purpose: 'Family Visit',
    visitingFlat: 'A-101',
    entryTime: '2025-01-15T10:30:00',
    qrCode: 'QR123456',
    status: 'checked-in'
  },
  {
    id: '2',
    name: 'Delivery Person',
    phoneNumber: '+91 9876543214',
    purpose: 'Package Delivery',
    visitingFlat: 'B-205',
    entryTime: '2025-01-15T14:15:00',
    exitTime: '2025-01-15T14:25:00',
    qrCode: 'QR123457',
    status: 'checked-out'
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Water Leakage in Bathroom',
    description: 'There is continuous water leakage from the bathroom ceiling.',
    category: 'plumbing',
    priority: 'high',
    status: 'in-progress',
    submittedBy: 'Rajesh Kumar',
    submittedDate: '2025-01-14T09:00:00',
    assignedTo: 'Maintenance Team'
  },
  {
    id: '2',
    title: 'Elevator Not Working',
    description: 'The elevator in Block A has been out of order since yesterday.',
    category: 'maintenance',
    priority: 'high',
    status: 'open',
    submittedBy: 'Sunita Verma',
    submittedDate: '2025-01-15T08:30:00'
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    residentId: '1',
    amount: 5000,
    type: 'maintenance',
    status: 'paid',
    dueDate: '2025-01-01',
    paidDate: '2024-12-28',
    description: 'Monthly maintenance fee - January 2025'
  },
  {
    id: '2',
    residentId: '1',
    amount: 5000,
    type: 'maintenance',
    status: 'pending',
    dueDate: '2025-02-01',
    description: 'Monthly maintenance fee - February 2025'
  }
];

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Annual General Meeting',
    description: 'Yearly AGM to discuss society matters and budget',
    date: '2025-02-15',
    time: '18:00',
    location: 'Community Hall',
    type: 'agm',
    organizer: 'Society Committee',
    attendees: []
  },
  {
    id: '2',
    title: 'Security Committee Meeting',
    description: 'Discussion about enhanced security measures',
    date: '2025-01-25',
    time: '19:00',
    location: 'Committee Room',
    type: 'committee',
    organizer: 'Security Committee',
    attendees: []
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Water Supply Interruption',
    message: 'Water supply will be interrupted tomorrow (16th Jan) from 8 AM to 12 PM for maintenance work.',
    type: 'maintenance',
    priority: 'high',
    createdBy: 'Maintenance Team',
    createdDate: '2025-01-15T16:00:00',
    recipients: ['all']
  },
  {
    id: '2',
    title: 'Holi Celebration',
    message: 'Join us for Holi celebration on March 13th at the community garden. Refreshments will be provided.',
    type: 'celebration',
    priority: 'medium',
    createdBy: 'Cultural Committee',
    createdDate: '2025-01-14T10:00:00',
    recipients: ['all']
  }
];