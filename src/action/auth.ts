'use server';

import { AuthToken } from '@/interface/jwt-payload';
import { getAxiosError } from '@/lib/getAxiosError';
import { SignIn, SignUp } from '@/services/auth';
import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { setAuthToken } from './set-cookie';

export interface LoginState {
  error?: string | null;
  success?: boolean;
  user?: { _id: string; name: string; } | null;
}


export interface RegisterState {
  error?: string | null;
  success?: boolean;
  user?: { _id: string; name: string; } | null;
}

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  try {

    const response = await SignIn(email, password);

    if (response && response.accessToken) {
      await setAuthToken('accessToken', response.accessToken);
      await setAuthToken('refreshToken', response.refreshToken)

      const decodedToken = jwtDecode<AuthToken>(response.accessToken);
      const userInfo = {
        _id: (decodedToken.id || decodedToken._id || '') as string,
        name: decodedToken.name,
      };

      return { success: true, user: userInfo };
    } else {
      throw new Error('Login successful but access token missing in response.');
    }
  } catch (error: unknown) {
    console.error('Login action error:', error);
    if (error instanceof AxiosError) {
      const err = getAxiosError(error);
      return { error: `${err.message} (Status: ${err.status})` };
    } else if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred during login.' };
  }

}

export async function registerAction(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return { error: 'Name, email, and password are required.' };
  }

  try {

    const response = await SignUp(name, email, password);
    if (response && response.accessToken) {
      await setAuthToken('accessToken', response.accessToken);

      await setAuthToken('refreshToken', response.refreshToken);

      const decodedToken = jwtDecode<AuthToken>(response.accessToken);
      const userInfo = {
        _id: (decodedToken.id || decodedToken._id || '') as string,
        name: decodedToken.name,
      };

      return { success: true, user: userInfo };
    } else {
      throw new Error('Registration successful but access token missing in response.');
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const err = getAxiosError(error);
      return { error: `${err.message} (Status: ${err.status})` };
    } else if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred during registration.' };
  }
}

