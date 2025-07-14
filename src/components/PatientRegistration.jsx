import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const PatientRegistration = ({ stations }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!serialNumber || !selectedStation) {
      setMessage('Please enter serial number and select a station');
      return;
    }

    try {
      const patientsRef = collection(db, 'patients');
      const q = query(patientsRef, where('serialNumber', '==', serialNumber));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setMessage('Serial number already registered');
        return;
      }

      await addDoc(patientsRef, {
        serialNumber,
        station: selectedStation,
        timestamp: new Date().toISOString(),
        status: 'waiting'
      });

      setMessage('Registration successful! Please wait for your number to be called.');
      setSerialNumber('');
      setSelectedStation('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error registering patient');
      console.error(error);
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
            <h1 className="text-2xl font-bold text-gray-800">Patient Registration</h1>
            <p className="text-gray-600 mt-2">Enter your details to join the queue</p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Serial Number
              </label>
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter your serial number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Screening Station
              </label>
              <div className="grid gap-3">
                {stations.map(station => {
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
              Register
            </button>
            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('successful') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
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