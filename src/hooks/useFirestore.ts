import { useState } from 'react';
import { 
  doc, 
  deleteDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'react-hot-toast';

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);

  const deleteDocument = async (collectionName: string, id: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, collectionName, id));
      toast.success('Supprimé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateDocument = async (collectionName: string, id: string, data: any) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, collectionName, id), {
        ...data,
        updatedAt: new Date().toISOString()
      });
      toast.success('Mis à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteClientAndRelated = async (clientId: string) => {
    setLoading(true);
    try {
      // 1. Get all contracts for this client
      const contractsQuery = query(
        collection(db, 'contracts'),
        where('clientId', '==', clientId)
      );
      const contractsSnapshot = await getDocs(contractsQuery);
      const contractIds = contractsSnapshot.docs.map(doc => doc.id);

      // 2. Get all claims for these contracts
      const claimsPromises = contractIds.map(contractId => 
        getDocs(query(
          collection(db, 'claims'),
          where('contractId', '==', contractId)
        ))
      );
      const claimsSnapshots = await Promise.all(claimsPromises);
      
      // 3. Delete all claims
      const deleteClaimsPromises = claimsSnapshots.flatMap(snapshot =>
        snapshot.docs.map(doc => deleteDoc(doc.ref))
      );
      await Promise.all(deleteClaimsPromises);

      // 4. Delete all contracts
      const deleteContractsPromises = contractsSnapshot.docs.map(doc =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deleteContractsPromises);

      // 5. Finally delete the client
      await deleteDoc(doc(db, 'clients', clientId));

      toast.success('Client et données associées supprimés avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteContractAndClaims = async (contractId: string) => {
    setLoading(true);
    try {
      // 1. Get all claims for this contract
      const claimsQuery = query(
        collection(db, 'claims'),
        where('contractId', '==', contractId)
      );
      const claimsSnapshot = await getDocs(claimsQuery);

      // 2. Delete all claims
      const deleteClaimsPromises = claimsSnapshot.docs.map(doc =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deleteClaimsPromises);

      // 3. Delete the contract
      await deleteDoc(doc(db, 'contracts', contractId));

      toast.success('Contrat et sinistres associés supprimés avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    deleteDocument,
    updateDocument,
    deleteClientAndRelated,
    deleteContractAndClaims
  };
};