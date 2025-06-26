// /client/src/components/LoginForm.tsx

import React, { useState } from 'react';
import type { LoginData } from '../services/apiService';

interface LoginFormProps {
  onSubmit: (data: LoginData) => Promise<void>;
  isLoading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button type="submit" disabled={isLoading} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};
