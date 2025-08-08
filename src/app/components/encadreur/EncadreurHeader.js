// components/encadreur/EncadreurHeader.js
export default function EncadreurHeader({ encadreur }) {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleLogout = () => {
    // Logique de déconnexion à implémenter
    console.log('Déconnexion...');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Dashboard Encadreur
              </h1>
              <p className="text-sm text-gray-500 capitalize">
                {currentDate}
              </p>
            </div>
          </div>

          {/* Informations utilisateur */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {encadreur.nom}
              </p>
              <p className="text-xs text-gray-500">
                {encadreur.fonction}
              </p>
            </div>
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 font-semibold text-sm">
                {encadreur.nom.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="relative">
              <button
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors duration-200"
                title="Se déconnecter"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}