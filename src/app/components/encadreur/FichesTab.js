'use client'

import { useState } from 'react';

export default function FichesTab({ stagiaires }) {
  const [downloading, setDownloading] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'recent', 'oldest'

  // Générer des fiches simulées basées sur les stagiaires
  const generateFiches = () => {
    const fiches = [];
    stagiaires.forEach(stagiaire => {
      for (let i = 0; i < stagiaire.fichesEnAttente; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (i * 7)); // Une fiche par semaine
        
        fiches.push({
          id: `${stagiaire.id}_${i}`,
          stagiaireId: stagiaire.id,
          stagiaireName: stagiaire.nom,
          departement: stagiaire.departement,
          periode: `Semaine du ${date.toLocaleDateString('fr-FR')}`,
          dateCreation: date,
          joursPresents: Math.floor(Math.random() * 3) + 3, // Entre 3 et 5 jours
          heuresTotal: Math.floor(Math.random() * 10) + 30, // Entre 30 et 40h
          status: 'non_telecharge'
        });
      }
    });
    
    // Trier par date de création (plus récent en premier)
    return fiches.sort((a, b) => b.dateCreation - a.dateCreation);
  };

  const allFiches = generateFiches();
  
  const filteredFiches = allFiches.filter(fiche => {
    const daysDiff = Math.floor((new Date() - fiche.dateCreation) / (1000 * 60 * 60 * 24));
    
    switch(filter) {
      case 'recent':
        return daysDiff <= 7;
      case 'oldest':
        return daysDiff > 14;
      default:
        return true;
    }
  });

  const handleDownload = async (ficheId) => {
    setDownloading(ficheId);
    
    // Simulation du téléchargement
    setTimeout(() => {
      console.log(`Téléchargement de la fiche ${ficheId}`);
      // Ici vous pouvez implémenter la logique de téléchargement réelle
      // Par exemple, générer un PDF ou télécharger depuis le serveur
      setDownloading(null);
      
      // Optionnel: Retirer la fiche de la liste après téléchargement
      // Dans un vrai cas, cela serait géré par l'état global ou une requête API
    }, 2000);
  };

  const getInitials = (nom) => {
    return nom.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDateRelative = (date) => {
    const daysDiff = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) return "Aujourd'hui";
    if (daysDiff === 1) return "Hier";
    if (daysDiff <= 7) return `Il y a ${daysDiff} jours`;
    if (daysDiff <= 30) return `Il y a ${Math.floor(daysDiff / 7)} semaine(s)`;
    return date.toLocaleDateString('fr-FR');
  };

  const getDepartmentColor = (departement) => {
    const colors = {
      'Informatique': 'bg-blue-100 text-blue-800',
      'Marketing': 'bg-green-100 text-green-800',
      'RH': 'bg-purple-100 text-purple-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'Commercial': 'bg-red-100 text-red-800'
    };
    return colors[departement] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec filtres */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fiches de présence</h2>
          <p className="text-gray-600 mt-1">{filteredFiches.length} fiche(s) disponible(s)</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter('recent')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'recent' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Récentes (7j)
          </button>
          <button
            onClick={() => setFilter('oldest')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'oldest' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Anciennes (+14j)
          </button>
        </div>
      </div>

      {/* Liste des fiches */}
      {filteredFiches.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune fiche trouvée</h3>
          <p className="text-gray-500">Aucune fiche ne correspond aux filtres sélectionnés.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredFiches.map((fiche) => (
            <div key={fiche.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {/* Avatar du stagiaire */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {getInitials(fiche.stagiaireName)}
                  </div>
                  
                  {/* Informations de la fiche */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{fiche.stagiaireName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(fiche.departement)}`}>
                        {fiche.departement}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-2">{fiche.periode}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {fiche.joursPresents} jours
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {fiche.heuresTotal}h total
                      </span>
                      <span>• {formatDateRelative(fiche.dateCreation)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Bouton de téléchargement */}
                <button
                  onClick={() => handleDownload(fiche.id)}
                  disabled={downloading === fiche.id}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {downloading === fiche.id ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                        <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Téléchargement...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Télécharger PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}