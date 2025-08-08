'use client'

import { useState } from 'react';
import EncadreurHeader from '../components/encadreur/EncadreurHeader';
import VueGeneraleTab from '../components/encadreur/VueGeneraleTab';
import FichesTab from '../components/encadreur/FichesTab';

export default function EncadreurDashboardPage() {
  const [activeTab, setActiveTab] = useState('vue-generale');
  
  // Données simulées de l'encadreur
  const encadreur = {
    nom: "M ONDOBO Emile",
    email: "marie.kouam@art.com",
    departement: "Encadrement Digital",
    fonction: "Responsable de stage"
  };

  // Données simulées des stagiaires
  const stagiaires = [
    {
      id: 1,
      nom: "Antoine Emmanuel ESSOMBA ",
      email: "essombaantoine385@gmail.com.com",
      telephone: "+237 6 96 21 25 62",
      departement: "Développement Web",
      dateDebut: "2025-07-01",
      dateFin: "2025-09-31",
      etablissement: "ENSPY",
      niveau: "Quatrième Année Génie Informatique",
      projet: "Développement d'une application de gestion RH",
      fichesEnAttente: 3
    },
    {
      id: 2,
      nom: "Jessica Zame",
      email: "alice.martin@art.com",
      telephone: "+237 6XX XX XX XX",
      departement: "Design UX/UI",
      dateDebut: "2024-11-01",
      dateFin: "2025-04-30",
      etablissement: "ENSPY",
      niveau: "Cinquième année",
      projet: "Refonte de l'interface utilisateur du portail client",
      fichesEnAttente: 2
    },
    
  ];

  // Calcul du nombre total de fiches non téléchargées
  const totalFichesEnAttente = stagiaires.reduce((total, stagiaire) => 
    total + stagiaire.fichesEnAttente, 0
  );

  const tabs = [
    { id: 'vue-generale', name: 'Vue générale', icon: 'overview', count: totalFichesEnAttente },
    { id: 'fiches', name: 'Fiches de présence', icon: 'documents', count: totalFichesEnAttente }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête du dashboard */}
      <EncadreurHeader encadreur={encadreur} />
      
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
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 relative ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {tab.icon === 'overview' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    )}
                    {tab.icon === 'documents' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    <span>{tab.name}</span>
                    {tab.count > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                        {tab.count}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </nav>
          </div>
          
          {/* Contenu des onglets */}
          <div className="p-6">
            {activeTab === 'vue-generale' && (
              <VueGeneraleTab 
                stagiaires={stagiaires} 
                totalFichesEnAttente={totalFichesEnAttente} 
              />
            )}
            {activeTab === 'fiches' && (
              <FichesTab stagiaires={stagiaires} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}