import React, { useState } from 'react';
import { 
  CreditCard, 
  AlertTriangle, 
  Users, 
  Calendar, 
  FileText, 
  Bell,
  Plus,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { mockPayments, mockComplaints, mockVisitors, mockMeetings, mockAlerts } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export default function ResidentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const userPayments = mockPayments.filter(p => p.residentId === user?.id);
  const userComplaints = mockComplaints.filter(c => c.submittedBy === user?.name);
  const userVisitors = mockVisitors.filter(v => v.visitingFlat === user?.flatNumber);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'complaints', label: 'Complaints', icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 'visitors', label: 'Visitors', icon: <Users className="h-4 w-4" /> },
    { id: 'meetings', label: 'Meetings', icon: <Calendar className="h-4 w-4" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="h-4 w-4" /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell className="h-4 w-4" /> },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'overdue': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Flat {user?.flatNumber} • Resident Dashboard</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Outstanding Dues</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ₹{userPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Open Complaints</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userComplaints.filter(c => c.status !== 'resolved' && c.status !== 'closed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Visitors Today</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userVisitors.filter(v => new Date(v.entryTime).toDateString() === new Date().toDateString()).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Meetings</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockMeetings.filter(m => new Date(m.date) > new Date()).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {userPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(payment.status)}
                    <div>
                      <p className="font-medium text-gray-900">{payment.description}</p>
                      <p className="text-sm text-gray-600">Due: {new Date(payment.dueDate).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">₹{payment.amount.toLocaleString('en-IN')}</p>
                    <p className={`text-sm ${
                      payment.status === 'paid' ? 'text-green-600' : 
                      payment.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Complaints Tab */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">My Complaints</h3>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>New Complaint</span>
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {userComplaints.map((complaint) => (
                <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{complaint.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      complaint.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {complaint.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{complaint.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Category: {complaint.category}</span>
                    <span>Priority: {complaint.priority}</span>
                    <span>Submitted: {new Date(complaint.submittedDate).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Visitors Tab */}
      {activeTab === 'visitors' && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Visitor History</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {userVisitors.map((visitor) => (
                <div key={visitor.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{visitor.name}</p>
                    <p className="text-sm text-gray-600">{visitor.purpose}</p>
                    <p className="text-xs text-gray-500">Phone: {visitor.phoneNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Entry: {new Date(visitor.entryTime).toLocaleString('en-IN')}</p>
                    {visitor.exitTime && (
                      <p className="text-sm text-gray-600">Exit: {new Date(visitor.exitTime).toLocaleString('en-IN')}</p>
                    )}
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      visitor.status === 'checked-out' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {visitor.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other tabs content would go here */}
      {activeTab === 'meetings' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h3>
          <div className="space-y-4">
            {mockMeetings.map((meeting) => (
              <div key={meeting.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{meeting.description}</p>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                  <span>{new Date(meeting.date).toLocaleDateString('en-IN')} at {meeting.time}</span>
                  <span>{meeting.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{alert.message}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                    alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(alert.createdDate).toLocaleDateString('en-IN')} by {alert.createdBy}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Repository</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Society Bylaws', type: 'PDF', size: '2.3 MB' },
              { name: 'Lease Agreement Template', type: 'PDF', size: '1.8 MB' },
              { name: 'Maintenance Guidelines', type: 'PDF', size: '1.2 MB' },
              { name: 'Emergency Procedures', type: 'PDF', size: '956 KB' },
              { name: 'Parking Rules', type: 'PDF', size: '743 KB' },
              { name: 'Visitor Policy', type: 'PDF', size: '654 KB' },
            ].map((doc, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}