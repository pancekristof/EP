import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import PatientRegistration from './components/PatientRegistration';
import AdminDashboard from './components/AdminDashboard';
import WaitingRoomDisplay from './components/WaitingRoomDisplay';
import { VIEW_TYPES } from './utils/constants';

function App() {
  const [currentView, setCurrentView] = useState(VIEW_TYPES.PATIENT);
  const [patients, setPatients] = useState([]);
  const [calledPatients, setCalledPatients] = useState([]);

  const renderCurrentView = () => {
    switch (currentView) {
      case VIEW_TYPES.PATIENT:
        return (
          <PatientRegistration 
            patients={patients}
            setPatients={setPatients}
          />
        );
      case VIEW_TYPES.ADMIN:
        return (
          <AdminDashboard 
            patients={patients}
            setPatients={setPatients}
            calledPatients={calledPatients}
            setCalledPatients={setCalledPatients}
          />
        );
      case VIEW_TYPES.DISPLAY:
        return (
          <WaitingRoomDisplay 
            calledPatients={calledPatients}
          />
        );
      default:
        return <PatientRegistration />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      <main className="fade-in">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;