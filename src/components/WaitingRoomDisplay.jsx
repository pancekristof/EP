import React, { useState, useEffect } from 'react';
import { Monitor, Clock, AlertCircle } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const WaitingRoomDisplay = ({ stations }) => {
  const [calledPatients, setCalledPatients] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'calledPatients'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const patientsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCalledPatients(patientsList);
    });

    return () => unsubscribe();
  }, []);

  const getCalledPatientsForStation = (stationId) => {
    return calledPatients
      .filter(call => call.station === stationId)
      .slice(-4)
      .reverse();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-8">
            <div className="bg-green-500 rounded-full p-3 w-16 h-16 mx-auto mb-3">
              <Monitor className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Now Calling</h1>
            <p className="text-xl text-gray-600">Please check your station below</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{gridTemplateColumns: stations.length <= 3 ? `repeat(${stations.length}, 1fr)` : 'repeat(auto-fit, minmax(300px, 1fr))'}}>
            {stations.map(station => {
              const Icon = station.icon;
              const stationPatients = getCalledPatientsForStation(station.id);
              return (
                <div key={station.id} className="bg-white border-4 border-gray-200 rounded-2xl overflow-hidden shadow-lg min-h-[400px] flex flex-col">
                  <div className={`${station.color} p-6 text-white text-center flex-shrink-0`}>
                    <Icon className="w-16 h-16 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">{station.name}</h2>
                  </div>
                  <div className="flex-1 p-6">
                    {stationPatients.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p className="text-lg text-gray-500">No patients called yet</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
                          Called Patients
                        </h3>
                        {stationPatients.map((call, index) => (
                          <div key={`${call.serialNumber}-${call.calledAt}`} 
                               className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                                 index === 0 
                                   ? 'border-red-500 bg-red-50 animate-pulse shadow-lg' 
                                   : 'border-gray-200 bg-gray-50'
                               }`}>
                            <div className="text-center">
                              <div className="flex items-center justify-center space-x-2 mb-2">
                                {index === 0 && (
                                  <AlertCircle className="w-5 h-5 text-red-500" />
                                )}
                                <span className={`text-3xl font-bold ${
                                  index === 0 ? 'text-red-600' : 'text-gray-800'
                                }`}>
                                  {call.serialNumber}
                                </span>
                                {index === 0 && (
                                  <AlertCircle className="w-5 h-5 text-red-500" />
                                )}
                              </div>
                              {index === 0 ? (
                                <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-2">
                                  COME IN NOW
                                </div>
                              ) : (
                                <div className="bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-medium mb-2">
                                  COMPLETED
                                </div>
                              )}
                              <p className={`text-sm ${
                                index === 0 ? 'text-red-600 font-medium' : 'text-gray-600'
                              }`}>
                                {new Date(call.calledAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center bg-blue-50 rounded-xl p-4">
            <p className="text-lg text-blue-800 font-medium">
              📍 Look for your serial number in your station column above
            </p>
            <p className="text-base text-blue-600 mt-1">
              When your number appears with "COME IN NOW", proceed to that station
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoomDisplay;