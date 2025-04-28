'use server';

import { AuthToken } from '@/interface/jwt-payload';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export async function setCookie(name: string, value: string, expIn?: number) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    secure: process.env.NODE_ENV === 'production',
    expires: expIn && expIn * 1000,
  });
}

export async function setAuthToken(
  name: 'refresh_token' | 'access_token',
  value: string
) {
  const token = jwtDecode<AuthToken>(value);

  await setCookie(name, value, token.exp);
}


export const getLoginUserInfo = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');
  
  if (!accessToken || !accessToken.value) {
    return { userId: null, username: null };
  }

  try {
    const userInfo = jwtDecode<AuthToken>(accessToken.value);
    return {
      username: userInfo.username || null,
      userId: userInfo.sub || null,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return { userId: null, username: null };
  }
};

export async function clearCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('refresh_token');
  cookieStore.delete('access_token');
}
