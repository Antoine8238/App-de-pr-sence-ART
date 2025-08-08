'use client'


import { useState, useEffect } from 'react';
import StagiairesTab from '../components/drh/StagiairesTab';
import FichesEnAttenteTab from '../components/drh/FichesEnAttenteTab';
import RecapitulatifTab from '../components/drh/RecapitulatifTab';

export default function DRHDashboard() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'cellule'
  const [selectedCellule, setSelectedCellule] = useState(null);
  const [activeTab, setActiveTab] = useState('stagiaires');
  
  // Données des cellules
  const [cellulesData, setCellulesData] = useState({
    CSI: {
      stagiaires: [
        {
          id: 'CSI001',
          nom: 'ONDOBO MBASSI Emile',
          prenom: '',
          email: 'ondobo.emile@art.cm',
          telephone: '696212562',
          fonction: 'CEA',
          dateDebut: '2025-07-01',
          dateFin: '',
          status: 'En cours'
        },
        {
          id: 'CSI002',
          nom: 'AVA AVA Bernard Arnaud',
          prenom: '',
          email: 'ava.arnaud@art.cm',
          telephone: '650882514',
          niveau: 'Cinquième année',
          specialite: '',
          fonction: 'CEA',
          dateDebut: '2016-02-01',
          dateFin: '',
          status: 'En cours',
          etablissement: ''
        },
         {
          id: 'CSI003',
          nom: 'OYANE Rick Stahn',
          prenom: '',
          email: 'oyane.stahn@art.cm',
          telephone: '650882514',
          niveau: 'Cinquième année',
          specialite: '',
          fonction: 'CEA',
          dateDebut: '2016-02-01',
          dateFin: '',
          status: 'En cours',
          etablissement: ''
        },
        
      ],
      fichesEnAttente: [
        {
          id: 'FICHE_CSI_001',
          stagiaireId: 'CSI001',
          stagiaireName: 'AVA AVA Bernard Arnaud',
          fonction: 'CEA',
          periode: 'Semaine du 15/07/2024',
          dateReception: new Date('2024-07-20'),
          joursPresents: 5,
          heuresTotal: 40,
          status: 'recu',
          consulte: false,
          jointAuDossier: false
        },
        
        
      ]
    },
    CPT: {
      stagiaires: [
        {
          id: 'CPT001',
          nom: 'Paul Mbarga',
          prenom: 'Paul',
          email: 'paul.mbarga@email.com',
          telephone: '07 11 22 33 44',
          niveau: 'Master 2',
          specialite: 'Urbanisme',
          encadreur: 'Mme Ateba',
          dateDebut: '2024-01-20',
          dateFin: '2024-06-20',
          status: 'En cours',
          etablissement: 'Université de Dschang'
        },
        {
          id: 'CPT002',
          nom: 'Sophie Nanga',
          prenom: 'Sophie',
          email: 'sophie.nanga@email.com',
          telephone: '07 55 66 77 88',
          niveau: 'Licence 3',
          specialite: 'Aménagement du territoire',
          encadreur: 'M. Owona',
          dateDebut: '2024-02-05',
          dateFin: '2024-07-05',
          status: 'En cours',
          etablissement: 'Université de Bamenda'
        },
        {
          id: 'CPT003',
          nom: 'Diane Essomba',
          prenom: 'Diane',
          email: 'diane.essomba@email.com',
          telephone: '07 33 44 55 66',
          niveau: 'Master 1',
          specialite: 'Géographie urbaine',
          encadreur: 'Mme Ateba',
          dateDebut: '2024-01-15',
          dateFin: '2024-06-15',
          status: 'En cours',
          etablissement: 'Université de Yaoundé I'
        }
      ],
      fichesEnAttente: [
        {
          id: 'FICHE_CPT_001',
          stagiaireId: 'CPT001',
          stagiaireName: 'Paul Mbarga',
          encadreur: 'Mme Ateba',
          periode: 'Semaine du 15/07/2024',
          dateReception: new Date('2024-07-21'),
          joursPresents: 5,
          heuresTotal: 40,
          status: 'recu',
          consulte: false,
          jointAuDossier: false
        },
        {
          id: 'FICHE_CPT_002',
          stagiaireId: 'CPT002',
          stagiaireName: 'Sophie Nanga',
          encadreur: 'M. Owona',
          periode: 'Semaine du 15/07/2024',
          dateReception: new Date('2024-07-20'),
          joursPresents: 4,
          heuresTotal: 32,
          status: 'recu',
          consulte: true,
          jointAuDossier: false
        }
      ]
    }
  });

  // Calculer les statistiques globales
  const stats = {
    CSI: {
      stagiaires: cellulesData.CSI.stagiaires.length,
      fichesEnAttente: cellulesData.CSI.fichesEnAttente.filter(f => !f.consulte).length,
      fichesTransmises: cellulesData.CSI.fichesEnAttente.filter(f => f.jointAuDossier).length
    },
    CPT: {
      stagiaires: cellulesData.CPT.stagiaires.length,
      fichesEnAttente: cellulesData.CPT.fichesEnAttente.filter(f => !f.consulte).length,
      fichesTransmises: cellulesData.CPT.fichesEnAttente.filter(f => f.jointAuDossier).length
    }
  };

  const navigateToCellule = (celluleId) => {
    setSelectedCellule(celluleId);
    setCurrentView('cellule');
    setActiveTab('stagiaires');
  };

  const navigateBack = () => {
    setCurrentView('dashboard');
    setSelectedCellule(null);
  };

  const updateFichesEnAttente = (celluleId, newFiches) => {
    setCellulesData(prev => ({
      ...prev,
      [celluleId]: {
        ...prev[celluleId],
        fichesEnAttente: newFiches
      }
    }));
  };

  const cellules = [
    {
      id: 'CSI',
      nom: 'Cellule des Systèmes d\'Information',
      description: 'Gestion des stagiaires en informatique et systèmes',
      color: 'from-blue-500 to-blue-600',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'CPT',
      nom: 'Cellule des Plateformes Techniques ',
      description: 'Gestion des stagiaires en urbanisme et aménagement',
      color: 'from-green-500 to-green-600',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v4h4V6H4zm6 0v4h6V6h-6zM4 12v4h4v-4H4zm6 0v4h6v-4h-6z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  // Rendu du dashboard principal
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard DRH</h1>
                <p className="text-gray-600 mt-2">Gestion et suivi des fiches de présence</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.CSI.stagiaires + stats.CPT.stagiaires}
                  </div>
                  <div className="text-sm text-blue-600">Personnels actifs</div>
                </div>
                
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {stats.CSI.fichesEnAttente + stats.CPT.fichesEnAttente}
                  </div>
                  <div className="text-sm text-orange-600">Fiches en attente</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.CSI.fichesTransmises + stats.CPT.fichesTransmises}
                  </p>
                  <p className="text-gray-600">Fiches transmises</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.CSI.fichesEnAttente + stats.CPT.fichesEnAttente}
                  </p>
                  <p className="text-gray-600">En attente de validation</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM8 8a2 2 0 114 0 2 2 0 01-4 0zM12 15a4 4 0 00-8 0v1h8v-1z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-gray-600">Cellules actives</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(((stats.CSI.fichesTransmises + stats.CPT.fichesTransmises) / 
                      (stats.CSI.fichesTransmises + stats.CPT.fichesTransmises + stats.CSI.fichesEnAttente + stats.CPT.fichesEnAttente)) * 100) || 0}%
                  </p>
                  <p className="text-gray-600">Taux de traitement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cartes des cellules */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cellules.map((cellule) => (
              <div key={cellule.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* En-tête de la cellule */}
                <div className={`bg-gradient-to-r ${cellule.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                        {cellule.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{cellule.id}</h2>
                        <p className="text-white text-opacity-90 text-sm">{cellule.nom}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenu de la cellule */}
                <div className="p-6">
                  
                  
                  {/* Statistiques de la cellule */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {stats[cellule.id].stagiaires}
                      </div>
                      <div className="text-sm text-gray-600">Personnels</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {stats[cellule.id].fichesEnAttente}
                      </div>
                      <div className="text-sm text-gray-600"> Fiches en attente</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {stats[cellule.id].fichesTransmises}
                      </div>
                      <div className="text-sm text-gray-600"> Fiches transmises</div>
                    </div>
                  </div>

                  {/* Bouton d'accès */}
                  <button
                    onClick={() => navigateToCellule(cellule.id)}
                    className={`w-full bg-gradient-to-r ${cellule.color} text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2`}
                  >
                    <span>Accéder à la cellule {cellule.id}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Actions rapides */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-gray-700">Générer rapport mensuel</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span className="text-gray-700">Ajouter nouveau stagiaire</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700">Paramètres système</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Rendu de la page cellule avec onglets
  if (currentView === 'cellule' && selectedCellule) {
    const celluleData = cellulesData[selectedCellule];
    const celluleInfo = cellules.find(c => c.id === selectedCellule);

    const tabs = [
      {
        id: 'stagiaires',
        name: 'Personnel',
        count: celluleData.stagiaires.length,
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        id: 'fiches',
        name: 'Fiches en attente',
        count: celluleData.fichesEnAttente.length,
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        )
      },
      {
        id: 'recapitulatif',
        name: 'Récapitulatif mensuel',
        count: null,
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      }
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={navigateBack}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Retour au dashboard
                </button>
                <div className="h-6 border-l border-gray-300" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Cellule {selectedCellule}
                  </h1>
                  <p className="text-gray-600 mt-1">{celluleInfo?.nom}</p>
                </div>
              </div>
              
              <div className={`px-6 py-3 bg-gradient-to-r ${celluleInfo?.color} text-white rounded-lg`}>
                <div className="text-lg font-semibold">
                  {celluleData.stagiaires.length} personnel actif
                </div>
                <div className="text-sm opacity-90">
                  {celluleData.fichesEnAttente.filter(f => !f.consulte).length} fiches non consultées
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation des onglets */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                  {tab.count !== null && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenu des onglets */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'stagiaires' && (
            <StagiairesTab stagiaires={celluleData.stagiaires} cellule={selectedCellule} />
          )}
          
          {activeTab === 'fiches' && (
            <FichesEnAttenteTab 
              fiches={celluleData.fichesEnAttente} 
              setFiches={(newFiches) => updateFichesEnAttente(selectedCellule, newFiches)}
              cellule={selectedCellule} 
            />
          )}
          
          {activeTab === 'recapitulatif' && (
            <RecapitulatifTab 
              stagiaires={celluleData.stagiaires}
              cellule={selectedCellule}
            />
          )}
        </main>
      </div>
    );
  }

  return null;
}

