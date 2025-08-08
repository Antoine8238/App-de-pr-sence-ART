// components/encadreur/VueGeneraleTab.js
import StagiaireCard from './StagiaireCard';

export default function VueGeneraleTab({ stagiaires, totalFichesEnAttente }) {
  const calculateDaysRemaining = (dateFin) => {
    const today = new Date();
    const endDate = new Date(dateFin);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Résumé général */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">
              {stagiaires.length}
            </div>
            <div className="text-sm text-gray-600">
              Stagiaires encadrés
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {totalFichesEnAttente}
            </div>
            <div className="text-sm text-gray-600">
              Fiches en attente
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {stagiaires.filter(s => calculateDaysRemaining(s.dateFin) > 0).length}
            </div>
            <div className="text-sm text-gray-600">
              Stages en cours
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {stagiaires.filter(s => calculateDaysRemaining(s.dateFin) <= 30 && calculateDaysRemaining(s.dateFin) > 0).length}
            </div>
            <div className="text-sm text-gray-600">
              Fins de stage proches
            </div>
          </div>
        </div>
      </div>

      {/* Alerte fiches en attente */}
      {totalFichesEnAttente > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-amber-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div className="flex-1">
              <p className="text-amber-800 font-medium">
                {totalFichesEnAttente} fiche{totalFichesEnAttente > 1 ? 's' : ''} de présence en attente de téléchargement
              </p>
              <p className="text-amber-700 text-sm">
                Consultez longlet Fiches de présence pour les traiter
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section stagiaires */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Mes stagiaires ({stagiaires.length})
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {stagiaires.map((stagiaire) => (
            <StagiaireCard 
              key={stagiaire.id} 
              stagiaire={stagiaire}
              daysRemaining={calculateDaysRemaining(stagiaire.dateFin)}
              formatDate={formatDate}
            />
          ))}
        </div>
      </div>

      {/* Message si aucun stagiaire */}
      {stagiaires.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">
            Aucun stagiaire assigné
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Les stagiaires qui vous seront assignés apparaîtront ici
          </p>
        </div>
      )}
    </div>
  );
}