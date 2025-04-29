'use server';
import { clearCookies, tokenRefresh } from '@/action/set-cookie';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export const serverFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

serverFetch.interceptors.request.use(async (config) => {
  const cookiesInstance = await cookies();
  const accessToken = cookiesInstance.get('accessToken');
  if (accessToken?.value) {
    config.headers.Authorization = `Bearer ${accessToken.value}`;
  }
  return config;
});


serverFetch.interceptors.response.use(async (response) => response,
 async (error) => {
  const originalRequest = error.config;

  if(error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const refreshResponse = await tokenRefresh();

      const newAccessToken = refreshResponse?.data?.accessToken;

      if(newAccessToken) {
        serverFetch.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        return serverFetch(originalRequest);
      } else {
        console.error('(Server) Token refresh response missing accessToken');
        await clearCookies();
        return Promise.reject(error);
      }
    } catch(refreshError) {
      if (refreshError instanceof AxiosError) {
         console.error('(Server) Token refresh failed (AxiosError):', refreshError.response?.data || refreshError.message);
      } else {
         console.error('(Server) Token refresh failed:', refreshError);
      }

      await clearCookies();
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});

export async function checkSession() {
  try {
    const response = await serverFetch.get('/auth/check-session');
    return { success: true, user: response.data.data }; 
  } catch (error) {
    let errorMessage = 'Failed to check session';
    if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, user: null, error: errorMessage }; 
  }
} 