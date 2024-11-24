export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  contractCount: number;
  activeClaimsCount: number;
  status: 'Actif' | 'Inactif' | 'En attente';
  lastContact: string;
}