import React, { useState } from 'react';
import { Settings, Users, Clock, AlertCircle } from 'lucide-react';
import { STATIONS } from '../utils/constants';

const AdminDashboard = ({ patients, setPatients, calledPatients, setCalledPatients }) => {
  const [selectedStation, setSelectedStation] = useState('urology');
  
  const stationPatients = patients.filter(p => p.station === selectedStation);
  const waitingPatients = stationPatients.filter(p => p.status === 'waiting');
  const calledStationPatients = calledPatients.filter(p => p.station === selectedStation);

  const callPatient = (serialNumber) => {
    setPatients(prev => 
      prev.map(p => 
        p.serialNumber === serialNumber 
          ? { ...p, status: 'called' }
          : p
      )
    );
    
    const patient = patients.find(p => p.serialNumber === serialNumber);
    if (patient) {
      setCalledPatients(prev => [...prev, {
        ...patient,
        calledAt: new Date().toLocaleTimeString(),
        station: selectedStation
      }]);
    }
  };

  const recallPatient = (serialNumber) => {
    setPatients(prev => 
      prev.map(p => 
        p.serialNumber === serialNumber 
          ? { ...p, status: 'waiting' }
          : p
      )
    );
    
    setCalledPatients(prev => 
      prev.filter(call => call.serialNumber !== serialNumber)
    );
  };

  const completePatient = (serialNumber) => {
    setPatients(prev => 
      prev.filter(p => p.serialNumber !== serialNumber)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-500 rounded-full p-3">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Vezérlőpult</h1>
                <p className="text-gray-600">Beteg sor kezelése és hívások</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {STATIONS.map(station => {
              const Icon = station.icon;
              const count = patients.filter(p => p.station === station.id && p.status === 'waiting').length;
              return (
                <button
                  key={station.id}
                  onClick={() => setSelectedStation(station.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    selectedStation === station.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`${station.color} rounded-full p-3`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-medium text-gray-800">{station.name}</span>
                    </div>
                    <div className="bg-gray-100 rounded-full px-3 py-1">
                      <span className="text-sm font-medium text-gray-600">{count} várakozik</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Várakozó betegek */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {STATIONS.find(s => s.id === selectedStation)?.name} - Várakozó Sor
              </h3>
              
              {waitingPatients.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nincs várakozó beteg</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {waitingPatients.map(patient => (
                    <div key={patient.serialNumber} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 rounded-full p-2">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Sorszám: {patient.serialNumber}</p>
                            <p className="text-sm text-gray-600">Regisztrálva: {patient.timestamp}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => callPatient(patient.serialNumber)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                        >
                          Beteg Hívása
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Behívott betegek */}
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {STATIONS.find(s => s.id === selectedStation)?.name} - Behívott Betegek
              </h3>
              
              {calledStationPatients.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nincs behívott beteg</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {calledStationPatients.map(patient => (
                    <div key={`${patient.serialNumber}-${patient.calledAt}`} className="bg-white p-4 rounded-lg border-2 border-yellow-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-yellow-100 rounded-full p-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Sorszám: {patient.serialNumber}</p>
                            <p className="text-sm text-gray-600">Behívva: {patient.calledAt}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => recallPatient(patient.serialNumber)}
                            className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors duration-200"
                          >
                            Visszavon
                          </button>
                          <button
                            onClick={() => completePatient(patient.serialNumber)}
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors duration-200"
                          >
                            Befejez
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;