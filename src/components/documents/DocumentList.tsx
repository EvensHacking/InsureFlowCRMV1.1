import React from 'react';
import { File, Download, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  url: string;
}

interface DocumentListProps {
  documents: Document[];
  onDelete: (id: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, onDelete }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <File className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
              <p className="text-sm text-gray-500">
                {formatFileSize(doc.size)} • {format(doc.uploadedAt, 'Pp', { locale: fr })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <a
              href={doc.url}
              download
              className="p-2 text-gray-400 hover:text-gray-500"
              title="Télécharger"
            >
              <Download className="h-5 w-5" />
            </a>
            <button
              onClick={() => onDelete(doc.id)}
              className="p-2 text-gray-400 hover:text-red-500"
              title="Supprimer"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;