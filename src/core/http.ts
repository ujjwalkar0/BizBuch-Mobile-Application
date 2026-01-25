import Config from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function post<T>(
  endpoint: string,
  body: unknown,
  headers: Record<string, string> = {}
): Promise<T> {
  const response = await fetch(`${Config.API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
}

export async function postAuth<T>(
  endpoint: string,
  body: unknown,
  headers: Record<string, string> = {}
): Promise<T> {
  const token = await AsyncStorage.getItem('authToken');

  const response = await fetch(`${Config.API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
}

export async function getAuth<T>(
  endpoint: string,
  headers: Record<string, string> = {}
): Promise<T> {
  const token = await AsyncStorage.getItem('authToken');

  const response = await fetch(`${Config.API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data as T;
}

export async function patchAuth<T>(
  endpoint: string,
  body: unknown,
  headers: Record<string, string> = {}
): Promise<T> {
  const token = await AsyncStorage.getItem('authToken');

  const response = await fetch(`${Config.API_BASE_URL}${endpoint}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data as T;
}

export async function deleteAuth(
  endpoint: string,
  headers: Record<string, string> = {}
): Promise<void> {
  const token = await AsyncStorage.getItem('authToken');

  const response = await fetch(`${Config.API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data?.message || 'Request failed');
  }
}