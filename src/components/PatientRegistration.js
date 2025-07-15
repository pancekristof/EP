import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { STATIONS } from '../constants';
import { firebaseService } from '../services/firebase';

const PatientRegistration = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!serialNumber || !selectedStation) {
      setMessage('Kérjük adja meg a sorszámot és válasszon állomást');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await firebaseService.addPatient({
        serialNumber,
        station: selectedStation
      });

      setMessage('Sikeres regisztráció! Kérjük várja meg míg a sorszámát kihívják.');
      setSerialNumber('');
      setSelectedStation('');
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Hiba történt a regisztráció során. Kérjük próbálja újra.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-500 rounded-full p-4 w-20 h-20 mx-auto mb-4">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Beteg Regisztráció</h1>
            <p className="text-gray-600 mt-2">Adja meg adatait a sorba álláshoz</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sorszám
              </label>
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Adja meg a sorszámát"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Válasszon Szűrőállomást
              </label>
              <div className="grid gap-3">
                {STATIONS.map(station => {
                  const Icon = station.icon;
                  return (
                    <button
                      key={station.id}
                      onClick={() => setSelectedStation(station.id)}
                      disabled={isSubmitting}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedStation === station.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`${station.color} rounded-full p-2`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-gray-800">{station.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleRegister}
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? 'Regisztrálás...' : 'Regisztráció'}
            </button>

            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('Sikeres') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;