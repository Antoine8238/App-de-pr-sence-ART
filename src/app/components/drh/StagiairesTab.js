'use client'

import { useState } from 'react';

export default function StagiairesTab({ stagiaires, cellule }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filtrer les stagiaires
  const filteredStagiaires = stagiaires.filter(stagiaire => {
    const matchesSearch = stagiaire.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stagiaire.specialite.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stagiaire.encadreur.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || stagiaire.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getInitials = (nom) => {
    return nom.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status) => {
    const colors = {
      'En cours': 'bg-green-100 text-green-800',
      'Terminé': 'bg-blue-100 text-blue-800',
      'Suspendu': 'bg-red-100 text-red-800',
      'En attente': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getSpecialiteColor = (specialite) => {
    const colors = {
      'Développement Web': 'bg-blue-50 border-blue-200 text-blue-700',
      'Réseaux et Télécommunications': 'bg-purple-50 border-purple-200 text-purple-700',
      'Cybersécurité': 'bg-red-50 border-red-200 text-red-700',
      'Urbanisme': 'bg-green-50 border-green-200 text-green-700',
      'Aménagement du territoire': 'bg-yellow-50 border-yellow-200 text-yellow-700'
    };
    return colors[specialite] || 'bg-gray-50 border-gray-200 text-gray-700';
  };

  const calculateDaysRemaining = (dateFin) => {
    const today = new Date();
    const endDate = new Date(dateFin);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      {/* Header avec recherche et filtres */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Personnel de la cellule {cellule?.toUpperCase()}
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredStagiaires.length} personnel(s) trouvé(s)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher un personnel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
            <option value="Suspendu">Suspendu</option>
            <option value="En attente">En attente</option>
          </select>
        </div>
      </div>

      {/* Grille des cartes stagiaires */}
      {filteredStagiaires.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun stagiaire trouvé</h3>
          <p className="text-gray-500">Aucun stagiaire ne correspond aux critères de recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStagiaires.map((stagiaire) => {
            const daysRemaining = calculateDaysRemaining(stagiaire.dateFin);
            
            return (
              <div key={stagiaire.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200">
                {/* En-tête de la carte */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {getInitials(stagiaire.nom)}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {stagiaire.nom}
                        </h3>
                        <p className="text-gray-600 text-sm">{stagiaire.id}</p>
                      </div>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(stagiaire.status)}`}>
                      {stagiaire.status}
                    </span>
                  </div>
                </div>

                {/* Corps de la carte */}
                <div className="p-6 space-y-4">
                  {/* Spécialité */}
                  <div className={`p-3 rounded-lg border-2 border-dashed ${getSpecialiteColor(stagiaire.specialite)}`}>
                    <div className="text-sm font-medium">{stagiaire.niveau}</div>
                    <div className="text-xs opacity-80">{stagiaire.specialite}</div>
                  </div>

                  {/* Informations de contact */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="truncate">{stagiaire.email}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>{stagiaire.telephone}</span>
                    </div>
                  </div>

                  {/* Informations du stage */}
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Fonction :</span>
                      <span className="font-medium text-gray-900">{stagiaire.fonction}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600"></span>
                      <span className="font-medium text-gray-900 text-right max-w-[150px] truncate">
                        {stagiaire.etablissement}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Période :</span>
                      <span className="font-medium text-gray-900">
                        {formatDate(stagiaire.dateDebut)} - {formatDate(stagiaire.dateFin)}
                      </span>
                    </div>
                  </div>

                  {/* Durée restante */}
                  {daysRemaining > 0 && (
                    <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-blue-700">
                        {daysRemaining} jour{daysRemaining > 1 ? 's' : ''} restant{daysRemaining > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}

                  {daysRemaining <= 0 && stagiaire.status === 'En cours' && (
                    <div className="flex items-center justify-center p-3 bg-orange-50 rounded-lg">
                      <svg className="w-4 h-4 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-orange-700">
                        Stage terminé
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="px-6 pb-6">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Voir le dossier complet</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}