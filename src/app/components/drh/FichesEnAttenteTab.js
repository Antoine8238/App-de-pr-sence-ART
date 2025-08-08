'use client'


import { useState } from 'react';

export default function FichesEnAttenteTab({ fiches, setFiches, cellule }) {
  const [filter, setFilter] = useState('all');
  const [selectedFiches, setSelectedFiches] = useState([]);
  const [showConsultModal, setShowConsultModal] = useState(null);
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Filtrer les fiches
  const filteredFiches = fiches.filter(fiche => {
    switch(filter) {
      case 'non_consulte':
        return !fiche.consulte;
      case 'consulte':
        return fiche.consulte && !fiche.jointAuDossier;
      case 'joint':
        return fiche.jointAuDossier;
      default:
        return true;
    }
  });

  const handleConsulter = (ficheId) => {
    setShowConsultModal(ficheId);
  };

  const handleCloseModal = () => {
    setShowConsultModal(null);
  };

  const handleMarquerConsulte = (ficheId) => {
    setFiches(prev => prev.map(fiche => 
      fiche.id === ficheId 
        ? { ...fiche, consulte: true }
        : fiche
    ));
    setShowConsultModal(null);
  };

  const handleJoindreDossier = (ficheId) => {
    setFiches(prev => prev.map(fiche => 
      fiche.id === ficheId 
        ? { ...fiche, jointAuDossier: true, consulte: true }
        : fiche
    ));
  };

  const handleTransmettreAuDG = async () => {
    setIsTransmitting(true);
    
    // Simulation de l'envoi
    setTimeout(() => {
      const fichesJointes = fiches.filter(f => f.jointAuDossier);
      console.log(`Transmission au DG de ${fichesJointes.length} fiches de la cellule ${cellule}`);
      
      // Retirer les fiches transmises de la liste
      setFiches(prev => prev.filter(f => !f.jointAuDossier));
      setIsTransmitting(false);
      
      // Notification de succès (vous pouvez implémenter un système de toast)
      alert(`${fichesJointes.length} fiche(s) transmise(s) avec succès au Directeur Général`);
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
    return date.toLocaleDateString('fr-FR');
  };

  const fichesJointes = fiches.filter(f => f.jointAuDossier);

  return (
    <div className="space-y-6">
      {/* Header avec filtres et actions */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Fiches en attente - {cellule?.toUpperCase()}
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredFiches.length} fiche(s) • {fichesJointes.length} jointe(s) au dossier
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Toutes ({fiches.length})
            </button>
            <button
              onClick={() => setFilter('non_consulte')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'non_consulte' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Non consultées ({fiches.filter(f => !f.consulte).length})
            </button>
            <button
              onClick={() => setFilter('joint')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'joint' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Jointes ({fichesJointes.length})
            </button>
          </div>

          {/* Bouton de transmission au DG */}
          {fichesJointes.length > 0 && (
            <button
              onClick={handleTransmettreAuDG}
              disabled={isTransmitting}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
            >
              {isTransmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                    <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span>Transmission...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Transmettre au DG ({fichesJointes.length})</span>
                </>
              )}
            </button>
          )}
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
            <div key={fiche.id} className={`bg-white rounded-xl border p-6 transition-all duration-200 ${
              fiche.jointAuDossier 
                ? 'border-green-200 bg-green-50' 
                : !fiche.consulte 
                  ? 'border-orange-200 bg-orange-50 hover:shadow-md' 
                  : 'border-gray-200 hover:shadow-md'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Avatar du stagiaire */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {getInitials(fiche.stagiaireName)}
                  </div>
                  
                  {/* Informations de la fiche */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{fiche.stagiaireName}</h3>
                      <span className="text-sm text-gray-500">({fiche.id})</span>
                      
                      {/* Badges de statut */}
                      <div className="flex gap-2">
                        {!fiche.consulte && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                            Non consulté
                          </span>
                        )}
                        {fiche.consulte && !fiche.jointAuDossier && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            Consulté
                          </span>
                        )}
                        {fiche.jointAuDossier && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Joint au dossier
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Période :</span>
                        <div>{fiche.periode}</div>
                      </div>
                      
                      <div>
                        <span className="font-medium">Fonction :</span>
                        <div>{fiche.fonction}</div>
                      </div>
                      
                      <div>
                        <span className="font-medium">Présence :</span>
                        <div>{fiche.joursPresents} jours • {fiche.heuresTotal}h</div>
                      </div>
                      
                      <div>
                        <span className="font-medium">Reçue :</span>
                        <div>{formatDateRelative(fiche.dateReception)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Boutons d'action */}
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleConsulter(fiche.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                      fiche.consulte 
                        ? 'bg-gray-100 text-gray-500 cursor-default' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    disabled={fiche.consulte}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{fiche.consulte ? 'Consultée' : 'Consulter'}</span>
                  </button>
                  
                  <button
                    onClick={() => handleJoindreDossier(fiche.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                      fiche.jointAuDossier 
                        ? 'bg-green-100 text-green-700 cursor-default' 
                        : fiche.consulte
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={fiche.jointAuDossier || !fiche.consulte}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>
                      {fiche.jointAuDossier ? 'Jointe' : 'Joindre au dossier'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de consultation */}
      {showConsultModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {(() => {
              const fiche = fiches.find(f => f.id === showConsultModal);
              return (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      Consultation de la fiche de présence
                    </h3>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Informations détaillées de la fiche */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stagiaire</label>
                        <p className="text-gray-900 font-semibold">{fiche?.stagiaireName}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ID Fiche</label>
                        <p className="text-gray-900">{fiche?.id}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
                        <p className="text-gray-900">{fiche?.periode}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Encadreur</label>
                        <p className="text-gray-900">{fiche?.encadreur}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jours présents</label>
                        <p className="text-gray-900 font-semibold text-green-600">{fiche?.joursPresents} jours</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total heures</label>
                        <p className="text-gray-900 font-semibold text-blue-600">{fiche?.heuresTotal}h</p>
                      </div>
                    </div>
                  </div>

                  {/* Simulation du contenu détaillé */}
                  <div className="space-y-4 mb-6">
                    <h4 className="font-semibold text-gray-900">Détail hebdomadaire</h4>
                    
                    <div className="overflow-hidden rounded-lg border">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jour</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Arrivée</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Départ</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heures</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((jour, index) => {
                            const isPresent = index < (fiche?.joursPresents || 0);
                            return (
                              <tr key={jour}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{jour}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {isPresent ? '08:00' : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {isPresent ? '17:00' : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {isPresent ? '8h' : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    isPresent 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {isPresent ? 'Présent' : 'Absent'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-blue-900 mb-2">Observations de lencadreur</h5>
                      <p className="text-blue-800 text-sm">
                        Excellente ponctualité et assiduité. Travail de qualité sur les projets assignés. 
                        Bonne intégration dans léquipe.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Fermer
                    </button>
                    <button
                      onClick={() => handleMarquerConsulte(showConsultModal)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Marquer comme consultée
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}