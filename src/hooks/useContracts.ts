import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Contract {
  id: string;
  title: string;
  description?: string;
  status: 'Actif' | 'Résilié' | 'En attente';
  annualAmount: number;
  clientId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export const useContracts = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'contracts'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const contractsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Contract[];
        
        setContracts(contractsData);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { contracts, loading, error };
};