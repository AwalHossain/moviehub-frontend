import { clientFetch } from "../client-fetch";
import { ENDPOINTS } from "../endpoints";

interface AuthData {
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    name: string;
    role: string;
    isEmailVerified: boolean;
    avatar: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}


export const SignUp = async (name: string, email: string, password: string): Promise<AuthData | undefined> => {
  const url = `${ENDPOINTS["SIGNUP"]}`;
  try {
    const response = await clientFetch.post(url, {
      name,
      email,
      password,
    });
    console.log(response.data, "response from signup service"); 
    return response.data.data as AuthData;
  } catch (error) {
      console.error('Error during sign up:', error);
      throw error; 
  }
};

export const SignIn = async (email: string, password: string): Promise<AuthData> => {
  const url = `${ENDPOINTS["SIGNIN"]}`;
  try {
    const response = await clientFetch.post(url, {
      email,
      password,
    });
    if (response.data && response.data.data) { 
      console.log(response.data.data, "response data from signin service");
      return response.data.data as AuthData;
    } else {
      console.error("SignIn successful but no data found in response");
      throw new Error("Login failed: Invalid data structure from server");
    }
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
};


export const loadUser = async (): Promise<AuthData> => {
  const url = `${ENDPOINTS["LOAD_USER"]}`;
  try {
    const response = await clientFetch.get(url);
    console.log(response.data.data, "response data from load user service");
    return response.data.data as AuthData;
  } catch (error) {
    console.error("Error during load user:", error);
    throw error;
  }
}


