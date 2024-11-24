import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useContracts } from '../../hooks/useContracts';

const claimSchema = z.object({
  title: z.string().min(2, 'Le titre est requis'),
  description: z.string().optional(),
  contractId: z.string().min(1, 'Le contrat est requis'),
  declarationDate: z.string().min(1, 'La date de déclaration est requise'),
  estimatedAmount: z.number().optional(),
  status: z.enum(['Nouveau', 'En cours', 'En attente', 'Résolu']),
  priority: z.enum(['Basse', 'Moyenne', 'Haute', 'Urgente'])
});

type ClaimFormData = z.infer<typeof claimSchema>;

interface ClaimFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const ClaimForm: React.FC<ClaimFormProps> = ({ onSuccess, onCancel }) => {
  const { contracts } = useContracts();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClaimFormData>({
    resolver: zodResolver(claimSchema)
  });

  const onSubmit = async (data: ClaimFormData) => {
    try {
      await addDoc(collection(db, 'claims'), {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      toast.success('Sinistre créé avec succès');
      onSuccess();
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            {...register('title')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contrat</label>
          <select
            {...register('contractId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Sélectionnez un contrat</option>
            {contracts.map((contract) => (
              <option key={contract.id} value={contract.id}>
                {contract.title}
              </option>
            ))}
          </select>
          {errors.contractId && (
            <p className="mt-1 text-sm text-red-600">{errors.contractId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date de déclaration</label>
          <input
            type="date"
            {...register('declarationDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.declarationDate && (
            <p className="mt-1 text-sm text-red-600">{errors.declarationDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Montant estimé</label>
          <input
            type="number"
            {...register('estimatedAmount', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.estimatedAmount && (
            <p className="mt-1 text-sm text-red-600">{errors.estimatedAmount.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Statut</label>
          <select
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Nouveau">Nouveau</option>
            <option value="En cours">En cours</option>
            <option value="En attente">En attente</option>
            <option value="Résolu">Résolu</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priorité</label>
          <select
            {...register('priority')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
            <option value="Urgente">Urgente</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSubmitting ? 'Création...' : 'Créer le sinistre'}
        </button>
      </div>
    </form>
  );
};

export default ClaimForm;