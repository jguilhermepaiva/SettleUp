// /client/src/services/apiService.ts

const API_BASE_URL = 'http://localhost:3001/api';

// --- Interfaces de Dados ---
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// --- Função Central de Fetch ---
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // --- LOG DE DEPURAÇÃO ADICIONADO ---
  console.log(`[apiService] Resposta para ${endpoint}: Status ${response.status}, OK: ${response.ok}`);

  if (!response.ok) {
    // --- LOG DE DEPURAÇÃO ADICIONADO ---
    console.error(`[apiService] Entrou no bloco de erro para ${endpoint}.`);
    const errorData = await response.json();
    throw new Error(errorData.message || `Erro na requisição para ${endpoint}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return null;
};


// --- Serviços da API ---
export const apiService = {
  registerUser: (data: RegisterData) => {
    return apiFetch('/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  loginUser: (data: LoginData) => {
    return apiFetch('/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getProfile: () => {
    return apiFetch('/users/me', {
      method: 'GET',
    });
  },
};
