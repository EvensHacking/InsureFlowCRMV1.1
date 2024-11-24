import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FileText, AlertTriangle, MessageCircle } from 'lucide-react';

const ClientPortal = () => {
  const { user } = useAuth();

  const contracts = [
    {
      id: 'CTR001',
      type: 'Assurance Habitation',
      status: 'Actif',
      nextPayment: '2024-04-01',
      amount: '82€'
    }
  ];

  const claims = [
    {
      id: 'CLM001',
      type: 'Dégât des eaux',
      status: 'En cours',
      submitted: '2024-02-15'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenue, {user?.email}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold">Mes contrats</h2>
          </div>
          <div className="space-y-4">
            {contracts.map(contract => (
              <div key={contract.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{contract.type}</h3>
                    <p className="text-sm text-gray-500">Contrat #{contract.id}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    {contract.status}
                  </span>
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>Prochain paiement: {contract.nextPayment}</span>
                  <span>{contract.amount}/mois</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold">Mes sinistres</h2>
          </div>
          <div className="space-y-4">
            {claims.map(claim => (
              <div key={claim.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{claim.type}</h3>
                    <p className="text-sm text-gray-500">Sinistre #{claim.id}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {claim.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Déclaré le: {claim.submitted}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-700">
          <MessageCircle className="w-5 h-5" />
          Contacter mon conseiller
        </button>
      </div>
    </div>
  );
};

export default ClientPortal;