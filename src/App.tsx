import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import LoginModal from './components/Auth/LoginModal';
import LandingPage from './components/LandingPage';
import ResidentDashboard from './components/Dashboard/ResidentDashboard';
import ManagerDashboard from './components/Dashboard/ManagerDashboard';

function AppContent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useAuth();

  const renderDashboard = () => {
    if (!user) return <LandingPage />;
    
    switch (user.role) {
      case 'resident':
        return <ResidentDashboard />;
      case 'manager':
      case 'admin':
        return <ManagerDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLoginClick={() => setIsLoginModalOpen(true)} />
      {renderDashboard()}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;