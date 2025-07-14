import React, { useState, useEffect } from 'react';
import { Settings, Users, Clock } from 'lucide-react';
import { collection, query, where, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AdminDashboard = ({ stations }) => {
  const [selectedStation, setSelectedStation] = useState('urology');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const patientsRef = collection(db, 'patients');
      const q = query(patientsRef, where('station', '==', selectedStation), where('status', '==', 'waiting'));
      const querySnapshot = await getDocs(q);
      const patientsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPatients(patientsList);
    };

    fetchPatients();
  }, [selectedStation]);

  const callPatient = async (patientId, serialNumber) => {
    try {
      const patientRef = doc(db, 'patients', patientId);
      await updateDoc(patientRef, { status: 'called' });

      await addDoc(collection(db, 'calledPatients'), {
        serialNumber,
        station: selectedStation,
        calledAt: new Date().toISOString()
      });

      setPatients(prev => prev.filter(p => p.id !== patientId));
    } catch (error) {
      console.error('Error calling patient:', error);
    }
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
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600">Manage patient queue and calls</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {stations.map(station => {
              const Icon = station.icon;
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
                      <span className="text-sm font-medium text-gray-600">{patients.length} waiting</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {stations.find(s => s.id === selectedStation)?.name} Queue
            </h3>
            {patients.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No patients waiting</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {patients.map(patient => (
                  <div key={patient.id} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 rounded-full p-2">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Serial: {patient.serialNumber}</p>
                          <p className="text-sm text-gray-600">Registered: {new Date(patient.timestamp).toLocaleTimeString()}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => callPatient(patient.id, patient.serialNumber)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                      >
                        Call Patient
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;