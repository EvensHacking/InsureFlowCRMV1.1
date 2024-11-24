export interface Claim {
  id: string;
  contractId: string;
  clientId: string;
  clientName: string;
  type: string;
  status: 'Nouveau' | 'En cours' | 'En attente' | 'Résolu';
  description: string;
  dateSubmitted: string;
  dateLastUpdated: string;
  amount?: number;
  documents?: string[];
  priority: 'Basse' | 'Moyenne' | 'Haute' | 'Urgente';
}