'use client'

import { useState, useMemo } from 'react';

export default function RecapitulatifTab({ stagiaires, cellule }) {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Générer les données du récapitulatif mensuel
  const recapData = useMemo(() => {
    const [year, month] = selectedMonth.split('-');
    const monthName = new Date(year, month - 1, 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    
    // Simuler les données de présence pour le mois sélectionné
    const weeklyData = [];
    const daysInMonth = new Date(year, month, 0).getDate();
    const weeksInMonth = Math.ceil(daysInMonth / 7);
    
    for (let week = 1; week <= weeksInMonth; week++) {
      const weekData = {
        semaine: week,
        periode: `Semaine ${week}`,
        stagiaires: stagiaires.map(stagiaire => ({
          ...stagiaire,
          joursPresents: Math.floor(Math.random() * 2) + 4, // Entre 4 et 5 jours
          heuresTotal: Math.floor(Math.random() * 8) + 32, // Entre 32 et 40h
          retards: Math.floor(Math.random() * 3), // 0-2 retards
          absences: Math.floor(Math.random() * 2), // 0-1 absence
        }))
      };
      weeklyData.push(weekData);
    }
    
    return {
      monthName,
      weeklyData,
      totalStagiaires: stagiaires.length,
      moyennePresence: weeklyData.reduce((acc, week) => {
        const weekAvg = week.stagiaires.reduce((sum, s) => sum + s.joursPresents, 0) / week.stagiaires.length;
        return acc + weekAvg;
      }, 0) / weeklyData.length,
      totalHeures: weeklyData.reduce((acc, week) => {
        return acc + week.stagiaires.reduce((sum, s) => sum + s.heuresTotal, 0);
      }, 0)
    };
  }, [selectedMonth, stagiaires]);

  const generateMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      options.push({ value, label });
    }
    
    return options;
  };

  const getInitials = (nom) => {
    return nom.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPresenceColor = (joursPresents) => {
    if (joursPresents >= 5) return 'text-green-600 bg-green-50';
    if (joursPresents >= 4) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const exportToPDF = () => {
    console.log(`Export PDF du récapitulatif ${recapData.monthName} - Cellule ${cellule}`);
    // Implémentation de l'export PDF
    alert('Fonctionnalité d\'export PDF à implémenter');
  };

  return (
    <div className="space-y-6">
      {/* Header avec sélecteur de mois et actions */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Récapitulatif mensuel - {cellule?.toUpperCase()}
          </h2>
          <p className="text-gray-600 mt-1">
            {recapData.monthName} • {recapData.totalStagiaires} stagiaire(s) • {recapData.totalHeures}h total
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {generateMonthOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={exportToPDF}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Exporter PDF</span>
          </button>
        </div>
      </div>

      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{recapData.totalStagiaires}</p>
              <p className="text-gray-600 text-sm">Stagiaires actifs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{recapData.totalHeures}h</p>
              <p className="text-gray-600 text-sm">Heures totales</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{recapData.moyennePresence.toFixed(1)}</p>
              <p className="text-gray-600 text-sm">Jours moy./semaine</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((recapData.moyennePresence / 5) * 100)}%
              </p>
              <p className="text-gray-600 text-sm">Taux de présence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau récapitulatif par semaine */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Détail hebdomadaire</h3>
        </div>

        <div className="overflow-x-auto">
          {recapData.weeklyData.map((week) => (
            <div key={week.semaine} className="border-b border-gray-200 last:border-b-0">
              <div className="bg-gray-50 px-6 py-3">
                <h4 className="font-medium text-gray-900">{week.periode}</h4>
              </div>
              
              <div className="divide-y divide-gray-100">
                {week.stagiaires.map((stagiaire) => (
                  <div key={stagiaire.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {getInitials(stagiaire.nom)}
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900">{stagiaire.nom}</h5>
                          <p className="text-sm text-gray-600">{stagiaire.specialite}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPresenceColor(stagiaire.joursPresents)}`}>
                            {stagiaire.joursPresents} jours
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Présence</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-semibold text-gray-900">{stagiaire.heuresTotal}h</div>
                          <p className="text-xs text-gray-500">Total</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-semibold text-orange-600">{stagiaire.retards}</div>
                          <p className="text-xs text-gray-500">Retards</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-semibold text-red-600">{stagiaire.absences}</div>
                          <p className="text-xs text-gray-500">Absences</p>
                        </div>
                        
                        <div className="text-center">
                          <div className={`w-3 h-3 rounded-full ${
                            stagiaire.joursPresents >= 5 ? 'bg-green-500' :
                            stagiaire.joursPresents >= 4 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <p className="text-xs text-gray-500 mt-1">Statut</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Résumé de la semaine */}
              <div className="bg-blue-50 px-6 py-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-blue-900">Résumé semaine {week.semaine} :</span>
                  <div className="flex space-x-4">
                    <span className="text-blue-700">
                      Moyenne: {(week.stagiaires.reduce((sum, s) => sum + s.joursPresents, 0) / week.stagiaires.length).toFixed(1)} jours
                    </span>
                    <span className="text-blue-700">
                      Total: {week.stagiaires.reduce((sum, s) => sum + s.heuresTotal, 0)}h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions finales */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-gray-700">Générer rapport complet</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M7 13l3 3 7-7" />
            </svg>
            <span className="text-gray-700">Valider le mois</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span className="text-gray-700">Partager avec équipe</span>
          </button>
        </div>
      </div>
    </div>
  );
}