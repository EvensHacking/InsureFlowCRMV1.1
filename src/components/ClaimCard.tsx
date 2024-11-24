import React from 'react';
import { Clock, AlertCircle, FileText } from 'lucide-react';
import type { Claim } from '../types/claim';

const priorityColors = {
  'Basse': 'bg-blue-100 text-blue-800',
  'Moyenne': 'bg-yellow-100 text-yellow-800',
  'Haute': 'bg-orange-100 text-orange-800',
  'Urgente': 'bg-red-100 text-red-800'
};

const statusColors = {
  'Nouveau': 'bg-purple-100 text-purple-800',
  'En cours': 'bg-blue-100 text-blue-800',
  'En attente': 'bg-yellow-100 text-yellow-800',
  'Résolu': 'bg-green-100 text-green-800'
};

interface ClaimCardProps {
  claim: Claim;
  onClick: (claim: Claim) => void;
}

const ClaimCard: React.FC<ClaimCardProps> = ({ claim, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(claim)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{claim.clientName}</h3>
          <p className="text-sm text-gray-500">Contrat #{claim.contractId}</p>
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[claim.priority]}`}>
            {claim.priority}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[claim.status]}`}>
            {claim.status}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{claim.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{new Date(claim.dateSubmitted).toLocaleDateString()}</span>
        </div>
        {claim.documents && claim.documents.length > 0 && (
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>{claim.documents.length} document(s)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimCard;