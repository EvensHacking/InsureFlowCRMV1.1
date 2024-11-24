import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Claim } from '../types/claim';

export const useClaims = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'claims'), orderBy('dateSubmitted', 'desc'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const claimsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Claim[];
        
        setClaims(claimsData);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { claims, loading, error };
};