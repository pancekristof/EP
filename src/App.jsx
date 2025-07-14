import React, { useState } from 'react';
import { Stethoscope, Heart, Eye } from 'lucide-react';
import PatientRegistration from './components/PatientRegistration';
import AdminDashboard from './components/AdminDashboard';
import WaitingRoomDisplay from './components/WaitingRoomDisplay';
import './App.css';

const App = () => {
  const [currentView, setCurrentView] = useState('patient');

  const stations = [
    { id: 'urology', name: 'Urology', icon: Heart, color: 'bg-blue-500' },
    { id: 'eye', name: 'Eye Care', icon: Eye, color: 'bg-green-500' },
    { id: 'skincare', name: 'Skincare', icon: Stethoscope, color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 rounded-full p-2">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">Healthcare Management</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('patient')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentView === 'patient'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Patient Registration
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentView === 'admin'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Admin Dashboard
              </button>
              <button
                onClick={() => setCurrentView('display')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentView === 'display'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Waiting Room Display
              </button>
            </div>
          </div>
        </div>
      </nav>
      {currentView === 'patient' && <PatientRegistration stations={stations} />}
      {currentView === 'admin' && <AdminDashboard stations={stations} />}
      {currentView === 'display' && <WaitingRoomDisplay stations={stations} />}
    </div>
  );
};

export default App;