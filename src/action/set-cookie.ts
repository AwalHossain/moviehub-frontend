'use server';

import { AuthToken } from '@/interface/jwt-payload';
import { ENDPOINTS } from '@/services/endpoints';
import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export async function setCookie(name: string, value: string, expIn?: number) {
  const cookieStore = await cookies();
  const options = {
    secure: process.env.NODE_ENV === 'production',
    expires: expIn ? new Date(expIn * 1000) : undefined,
    path: '/',
    httpOnly: true,
    sameSite: 'lax' as const,
  };

  try {
    cookieStore.set(name, value, options);
  } catch (error) {
    console.error(`(Server) setCookie: Error setting cookie '${name}':`, error);
  }
}

export async function setAuthToken(
  name: 'refreshToken' | 'accessToken',
  value: string
) {
  try {
    const token = jwtDecode<AuthToken>(value);
    await setCookie(name, value, token.exp);
  } catch (error) {
    console.error(`server action error '${name}':`, error);
    throw error;
  }
}

export const getLoginUserInfo = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!accessToken || !accessToken.value) {
    return { _id: null, name: null, email: null, role: null };
  }

  try {
    const userInfo = jwtDecode<AuthToken>(accessToken.value);
    return {
      _id: userInfo._id || null,
      name: userInfo.name || null,
      email: userInfo.email || null,
      role: userInfo.role || null,
    };
  } catch (error) {
    console.error('(server) action error getLoginUserInfo:', error);
    return { _id: null, name: null, email: null, role: null };
  }
};

export async function tokenRefresh() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");

  const refreshUrl = process.env.NEXT_PUBLIC_BASE_URL! + ENDPOINTS["TOKEN_REFRESH"];

  if (refreshToken?.value) {
    try {
      const { data } = await axios.post(
        refreshUrl,
        {
          refreshToken: refreshToken.value
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `refreshToken=${refreshToken.value}`
          }
        }
      );

      const newAccessToken = data?.data?.accessToken;

      if (newAccessToken) {
        await setAuthToken("accessToken", newAccessToken);
      } else {
        console.error("Token refresh successful, but accessToken missing in response.", data);
      }

      return Promise.resolve(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(`Token refresh failed (AxiosError ${error.response?.status}):`, error.response?.data || error.message);
      } else {
        console.error(`Token refresh failed:`, error);
      }
      console.log("Token refresh failed: ", error);
      throw new Error("Token refresh failed from server action");
    }
  } else {
    console.error("Token refresh failed: No refresh token found.");
    throw new Error("No refresh token found");
  }
}

export async function clearCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('refreshToken');
  cookieStore.delete('accessToken');
}
