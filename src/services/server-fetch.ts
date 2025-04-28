 
'use server';
import axios from 'axios';
import { cookies } from 'next/headers';

export const serverFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

serverFetch.interceptors.request.use(async (config) => {
  const cookiesInstance = await cookies();
  const accessToken = cookiesInstance.get('access_token');
  config.headers.Authorization = `Bearer ${accessToken?.value}`;

  return config;
});


serverFetch.interceptors.response.use(async (response) => {
  if (response.status === 401) {
    const cookiesInstance = await cookies();
    cookiesInstance.delete('access_token');
  }
  return response;
});
