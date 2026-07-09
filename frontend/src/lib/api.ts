import type { ContactForm } from '../types';

const API_ROOT = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const API_BASE = API_ROOT ? `${API_ROOT}/api` : '/api';

export function resolveApiUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/api')) {
    return API_ROOT ? `${API_ROOT}${path}` : path;
  }
  return path;
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  sendContact: (data: ContactForm) =>
    fetchApi<{ success: boolean }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
