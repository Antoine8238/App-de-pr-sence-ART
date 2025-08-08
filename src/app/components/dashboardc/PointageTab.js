'use client'

import { useState, useEffect } from 'react';

export default function PointageTab() {
  const [pointageStatus, setPointageStatus] = useState({
    hasStarted: false,
    hasFinished: false,
    startTime: null,
    endTime: null
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mettre à jour l'heure actuelle chaque seconde
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleStartDay = () => {
    const now = new Date();
    setPointageStatus({
      ...pointageStatus,
      hasStarted: true,
      startTime: now
    });
    console.log('Journée commencée à:', now.toLocaleTimeString('fr-FR'));
  };

  const handleEndDay = () => {
    const now = new Date();
    setPointageStatus({
      ...pointageStatus,
      hasFinished: true,
      endTime: now
    });
    console.log('Journée terminée à:', now.toLocaleTimeString('fr-FR'));
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getCurrentDate = () => {
    return currentTime.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateWorkedTime = () => {
    if (pointageStatus.startTime && pointageStatus.endTime) {
      const diff = pointageStatus.endTime - pointageStatus.startTime;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}min`;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Horloge et date */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6">
        <div className="text-center">
          <div className="text-4xl font-mono font-bold text-indigo-600 mb-2">
            {formatTime(currentTime)}
          </div>
          <div className="text-lg text-gray-600 capitalize">
            {getCurrentDate()}
          </div>
        </div>
      </div>

      {/* Statut de la journée */}
      {(pointageStatus.hasStarted || pointageStatus.hasFinished) && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            État de votre journée
          </h3>
          <div className="space-y-3">
            {pointageStatus.hasStarted && (
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">
                  Journée commencée à {formatTime(pointageStatus.startTime)}
                </span>
              </div>
            )}
            {pointageStatus.hasFinished && (
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">
                  Journée terminée à {formatTime(pointageStatus.endTime)}
                </span>
              </div>
            )}
            {calculateWorkedTime() && (
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 font-semibold">
                  Temps travaillé: {calculateWorkedTime()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Boutons de pointage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bouton Commencer la journée */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Commencer la journée
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Enregistrez votre heure d_arrivée
            </p>
            <button
              onClick={handleStartDay}
              disabled={pointageStatus.hasStarted}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                pointageStatus.hasStarted
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {pointageStatus.hasStarted ? 'Journée commencée' : 'Commencer'}
            </button>
          </div>
        </div>

        {/* Bouton Finir la journée */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a8.949 8.949 0 008.354-5.646z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Finir la journée
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Enregistrez votre heure de départ
            </p>
            <button
              onClick={handleEndDay}
              disabled={!pointageStatus.hasStarted || pointageStatus.hasFinished}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                !pointageStatus.hasStarted || pointageStatus.hasFinished
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {!pointageStatus.hasStarted 
                ? 'Commencez d\'abord' 
                : pointageStatus.hasFinished 
                ? 'Journée terminée' 
                : 'Terminer'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}