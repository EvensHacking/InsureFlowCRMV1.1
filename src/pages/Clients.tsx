import React, { useState } from 'react';
import { Plus, Search, Filter, Loader, Mail, Phone, FileText, AlertTriangle } from 'lucide-react';
import { useClients } from '../hooks/useClients';
import { useFirestore } from '../hooks/useFirestore';
import type { Client } from '../types/client';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import ClientForm from '../components/forms/ClientForm';
import ActionButtons from '../components/ActionButtons';

const ClientCard: React.FC<{ 
  client: Client;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ client, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {client.firstName} {client.lastName}
          </h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Mail className="w-4 h-4" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Phone className="w-4 h-4" />
              <span>{client.phone}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            client.status === 'Actif' ? 'bg-green-100 text-green-800' :
            client.status === 'Inactif' ? 'bg-gray-100 text-gray-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {client.status}
          </span>
          <ActionButtons onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        <p>{client.address}</p>
        <p>{client.postalCode} {client.city}</p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span className="text-sm">{client.contractCount} contrats</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span className="text-sm">{client.activeClaimsCount} sinistres actifs</span>
          </div>
        </div>
        <span className="text-sm text-gray-500">
          Dernier contact: {new Date(client.lastContact).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

const Clients = () => {
  const { clients, loading, error } = useClients();
  const { deleteClientAndRelated } = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);
    const matchesStatus = statusFilter ? client.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleDelete = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedClient) {
      await deleteClientAndRelated(selectedClient.id);
      setIsDeleteDialogOpen(false);
      setSelectedClient(null);
    }
  };

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
        <button 
          onClick={() => {
            setSelectedClient(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" />
          Nouveau client
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Tous les statuts</option>
          <option value="Actif">Actif</option>
          <option value="Inactif">Inactif</option>
          <option value="En attente">En attente</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onEdit={() => handleEdit(client)}
              onDelete={() => handleDelete(client)}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClient(null);
        }}
        title={selectedClient ? "Modifier le client" : "Nouveau client"}
      >
        <ClientForm
          client={selectedClient}
          onSuccess={handleCreateSuccess}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedClient(null);
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Supprimer le client"
        message={`Êtes-vous sûr de vouloir supprimer ${selectedClient?.firstName} ${selectedClient?.lastName} ? Cette action supprimera également tous les contrats et sinistres associés.`}
      />
    </div>
  );
};

export default Clients;