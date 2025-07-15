import React from 'react';
import { Stethoscope } from 'lucide-react';
import { VIEW_TYPES } from '../constants';

const Navigation = ({ currentView, setCurrentView }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 rounded-full p-2">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Egészségügyi Kezelés</h1>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentView(VIEW_TYPES.PATIENT)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                currentView === VIEW_TYPES.PATIENT
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Beteg Regisztráció
            </button>
            <button
              onClick={() => setCurrentView(VIEW_TYPES.ADMIN)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                currentView === VIEW_TYPES.ADMIN
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Admin Vezérlő
            </button>
            <button
              onClick={() => setCurrentView(VIEW_TYPES.DISPLAY)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                currentView === VIEW_TYPES.DISPLAY
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Várótermi Kijelző
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;