// API service for making requests to the backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic fetch function with error handling
async function fetchData(endpoint: string, options: RequestInit = {}) {
  try {
    // Check if we're in development mode and the server might not be running
    if (import.meta.env.DEV) {
      console.warn('API call in development mode. In a real app, this would call:', `${API_URL}${endpoint}`);
      throw new Error('API server not running in development mode');
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
      throw new Error(errorData.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error: any) {
    console.error('API Error:', error.message || error);
    throw error;
  }
}

// Event API calls
export const eventApi = {
  getAll: () => fetchData('/events'),
  
  getById: (id: string) => fetchData(`/events/${id}`),
  
  create: (eventData: any) => fetchData('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  }),
  
  update: (id: string, eventData: any) => fetchData(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  }),
  
  delete: (id: string) => fetchData(`/events/${id}`, {
    method: 'DELETE',
  }),
  
  register: (id: string, userId: string) => fetchData(`/events/${id}/register`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }),
};

// User API calls
export const userApi = {
  register: (userData: any) => fetchData('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials: any) => fetchData('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getProfile: (id: string) => fetchData(`/users/profile/${id}`),
};