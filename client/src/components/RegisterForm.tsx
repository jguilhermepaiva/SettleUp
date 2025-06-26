// /client/src/components/RegisterForm.tsx

import React, { useState } from 'react';
import type { RegisterData } from '../services/apiService';

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => Promise<void>;
  isLoading: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Novo estado para a confirmação de senha
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Validação no lado do cliente antes de enviar
    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }
    setError(''); // Limpa o erro se as senhas coincidirem
    onSubmit({ username, email, password, confirmPassword });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
      {error && <p style={{ color: 'red', margin: 0, textAlign: 'center' }}>{error}</p>}
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ padding: '10px', fontSize: '16px' }}
      />
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
        minLength={6}
        style={{ padding: '10px', fontSize: '16px' }}
      />
      {/* Novo campo para confirmar a senha */}
      <input
        type="password"
        placeholder="Confirmar senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        minLength={6}
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button type="submit" disabled={isLoading} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
        {isLoading ? 'Registrando...' : 'Registrar'}
      </button>
    </form>
  );
};
