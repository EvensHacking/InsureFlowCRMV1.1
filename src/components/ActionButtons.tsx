import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onEdit}
        className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
        title="Modifier"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={onDelete}
        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
        title="Supprimer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ActionButtons;