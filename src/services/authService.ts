import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  timestamp: string;
  data: {
    token: string;
  };
}

export interface RegisterCredentials {
    email: string
    password: string;
    full_name: string
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<void> => {
    await axios.post(`${API_URL}/auth/register`, credentials)
  }
};


export default authService;