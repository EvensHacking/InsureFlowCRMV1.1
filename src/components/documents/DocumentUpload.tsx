import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';

interface DocumentUploadProps {
  onUploadComplete: (url: string) => void;
  folder: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUploadComplete, folder }) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      onUploadComplete(downloadURL);
      toast.success('Document téléchargé avec succès');
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
    }
  }, [folder, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? 'Déposez le fichier ici...'
            : 'Glissez-déposez un fichier ici, ou cliquez pour sélectionner'}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          PDF, PNG ou JPG jusqu'à 10MB
        </p>
      </div>

      {acceptedFiles.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <File className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">{acceptedFiles[0].name}</span>
            </div>
            <button
              onClick={() => acceptedFiles.splice(0, acceptedFiles.length)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;