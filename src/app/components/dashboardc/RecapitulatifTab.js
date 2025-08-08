'use client'

import { useState } from 'react';

export default function RecapitulatifTab() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Données simulées des fiches de présence
  const fichesPrevence = {
    2024: {
      11: [ // Décembre (index 11)
        { date: '2024-12-02', debut: '08:30', fin: '17:00', pause: '01:00', total: '07:30' },
        { date: '2024-12-03', debut: '08:45', fin: '17:15', pause: '01:00', total: '07:30' },
        { date: '2024-12-04', debut: '08:30', fin: '17:00', pause: '01:00', total: '07:30' },
        { date: '2024-12-05', debut: '08:30', fin: '17:00', pause: '01:00', total: '07:30' },
        { date: '2024-12-06', debut: '08:30', fin: '17:00', pause: '01:00', total: '07:30' },
      ],
      10: [ // Novembre (index 10)
        { date: '2024-11-04', debut: '08:30', fin: '17:00', pause: '01:00', total: '07:30' },
        { date: '2024-11-05', debut: '08:30', fin: '17:00', pause: '01:00', total: '07:30' },
        { date: '2024-11-06', debut: '08:30', fin: '17:00', pause: '01:00', total: '07:30' },
        { date: '2024-11-07', debut: '08:30', fin: '17:00', pause: '01:00', total: '07:30' },
        { date: '2024-11-08', debut: '08:30', fin: '17:00', pause: '01:00', total: '07:30' },
      ]
    }
  };

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const years = [2024, 2023, 2022];

  const getCurrentData = () => {
    return fichesPrevence[selectedYear]?.[selectedMonth] || [];
  };

  const calculateTotalHours = () => {
    const data = getCurrentData();
    let totalMinutes = 0;
    
    data.forEach(fiche => {
      const [hours, minutes] = fiche.total.split(':').map(Number);
      totalMinutes += hours * 60 + minutes;
    });

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return `${totalHours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ''}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric'
    });
  };

  const data = getCurrentData();

  return (
    <div className="space-y-6">
      {/* Sélecteurs de mois et année */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Consulter mes fiches de présence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
              Mois
            </label>
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
              Année
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Résumé du mois */}
      {data.length > 0 && (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                {data.length}
              </div>
              <div className="text-sm text-gray-600">
                Jours travaillés
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                {calculateTotalHours()}
              </div>
              <div className="text-sm text-gray-600">
                Heures totales
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                {months[selectedMonth]} {selectedYear}
              </div>
              <div className="text-sm text-gray-600">
                Période sélectionnée
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tableau des fiches de présence */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">
            Fiches de présence - {months[selectedMonth]} {selectedYear}
          </h4>
        </div>

        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Heure début
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Heure fin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pause
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Temps total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((fiche, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {formatDate(fiche.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fiche.debut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fiche.fin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fiche.pause}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">
                      {fiche.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              Aucune fiche de présence trouvée
            </p>
            <p className="text-gray-400 text-sm mt-2">
              pour {months[selectedMonth]} {selectedYear}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}