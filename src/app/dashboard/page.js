'use client'

import { useState } from 'react';
import DashboardHeader from '../components/dashboardc/DashboardHeader';
import PointageTab from '../components/dashboardc/PointageTab';
import RecapitulatifTab from '../components/dashboardc/RecapitulatifTab';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('pointage');
  
  // Données simulées du stagiaire (à remplacer par vos données réelles)
  const personnel = {
    nom: "ONDOBO MBASSI Emile",
    email: "ondobo.emile@art.cm",
    departement: " CEA CSI"
  };

  const tabs = [
    { id: 'pointage', name: 'Pointage', icon: 'clock' },
    { id: 'recapitulatif', name: 'Récapitulatif mensuel', icon: 'calendar' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête du dashboard */}
      <DashboardHeader personnel={personnel} />
      
      {/* Container principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation par onglets */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {tab.icon === 'clock' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {tab.icon === 'calendar' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    <span>{tab.name}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
          
          {/* Contenu des onglets */}
          <div className="p-6">
            {activeTab === 'pointage' && <PointageTab />}
            {activeTab === 'recapitulatif' && <RecapitulatifTab />}
          </div>
        </div>
      </div>
    </div>
  );
}