import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { STATIONS } from '../utils/constants';

const PatientRegistration = ({ patients, setPatients }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    if (!serialNumber || !selectedStation) {
      setMessage('Kérjük adja meg a sorszámot és válasszon állomást');
      return;
    }

    const existingPatient = patients.find(p => p.serialNumber === serialNumber);
    if (existingPatient) {
      setMessage('Ez a sorszám már regisztrálva van');
      return;
    }

    const newPatient = {
      serialNumber,
      station: selectedStation,
      timestamp: new Date().toLocaleTimeString(),
      status: 'waiting'
    };

    setPatients(prev => [...prev, newPatient]);
    setMessage('Sikeres regisztráció! Kérjük várja meg míg a sorszámát kihívják.');
    setSerialNumber('');
    setSelectedStation('');
    
    setTimeout(() => setMessage(''), 3000);
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
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedStation === station.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
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
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
            >
              Regisztráció
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