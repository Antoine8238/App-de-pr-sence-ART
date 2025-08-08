// components/encadreur/StagiaireCard.js
export default function StagiaireCard({ stagiaire, daysRemaining, formatDate }) {
  const getStatusColor = () => {
    if (daysRemaining <= 0) return 'bg-red-100 text-red-800';
    if (daysRemaining <= 30) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = () => {
    if (daysRemaining <= 0) return 'Stage terminé';
    if (daysRemaining <= 30) return `${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}`;
    return `${daysRemaining} jours restants`;
  };

  const getInitials = (nom) => {
    return nom.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      {/* En-tête de la carte */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-600 font-semibold text-lg">
              {getInitials(stagiaire.nom)}
            </span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              {stagiaire.nom}
            </h4>
            <p className="text-sm text-gray-500">
              {stagiaire.departement}
            </p>
          </div>
        </div>
        
        {/* Badge fiches en attente */}
        {stagiaire.fichesEnAttente > 0 && (
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {stagiaire.fichesEnAttente}
          </div>
        )}
      </div>

      {/* Informations du stagiaire */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {stagiaire.email}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {stagiaire.telephone}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {stagiaire.etablissement}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {stagiaire.niveau}
        </div>
      </div>

      {/* Période de stage */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="text-xs text-gray-500 uppercase font-semibold mb-1">
          Période de stage
        </div>
        <div className="text-sm text-gray-700">
          Du {formatDate(stagiaire.dateDebut)} au {formatDate(stagiaire.dateFin)}
        </div>
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor()}`}>
          {getStatusText()}
        </div>
      </div>

      {/* Projet */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 uppercase font-semibold mb-1">
          Projet assigné
        </div>
        <p className="text-sm text-gray-700">
          {stagiaire.projet}
        </p>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200">
          Voir détails
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200">
          Contact
        </button>
      </div>
    </div>
  );
}