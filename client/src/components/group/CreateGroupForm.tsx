import React, { useState } from 'react';
import type { CreateGroupData } from '../../services/apiService';

interface CreateGroupFormProps {
  onSubmit: (data: CreateGroupData) => Promise<void>;
  isLoading: boolean;
}

export const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '20px 0' }}>
      <input
        type="text"
        placeholder="Nome do Grupo (ex: Viagem à Praia)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
      />
      <button type="submit" disabled={isLoading} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
        {isLoading ? 'A criar...' : 'Criar Grupo'}
      </button>
    </form>
  );
};
