'use server';
import { clearCookies, tokenRefresh } from '@/action/set-cookie';
import { IMovie } from '@/components/dashboard/MovieForm';
import { Review } from '@/interface/reviews';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export const serverFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await tokenRefresh();

        const newAccessToken = refreshResponse?.data?.accessToken;

        if (newAccessToken) {
          serverFetch.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return serverFetch(originalRequest);
        } else {
          console.error('(Server) Token refresh response missing accessToken');
          await clearCookies();
          return Promise.reject(error);
        }
      } catch (refreshError) {
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

// session check
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
    throw new Error(errorMessage);
  }
}


// posting review
export async function postReview(reviewData: Partial<Review>) {
  try {
    const response = await serverFetch.post('/reviews', reviewData);
    return response.data;
  } catch (error) {
    let errorMessage = 'Failed to post review';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
}


// getting reviews
export async function getReviews(movieId: string) {
  try {
    const response = await serverFetch.get(`/reviews/movie/${movieId}`);
    return response.data;
  } catch (error) {
    let errorMessage = 'Failed to get reviews';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
}



interface SearchMovieParams {
  searchTerm?: string;
  filter?: Record<string, string | number | boolean>; // Allows key-value filters like { genre: 'Action', minRating: 7 }
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: string;
}

export async function getMovies(params: SearchMovieParams) {
  const { searchTerm, filter, page, limit, sortBy, sortOrder } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (searchTerm) {
    queryParams.append('searchTerm', searchTerm);
  }
  if (filter) {
    Object.entries(filter).forEach(([key, value]) => {
      queryParams.append(key, value.toString());
    });
  }

  if (sortBy) {
    queryParams.append('sortBy', sortBy);
    if (sortOrder) {
      queryParams.append('sortOrder', sortOrder);
    }
  }

  const queryString = queryParams.toString();
  console.log(queryString, "From server-fetch.ts");

  try {
    const response = await serverFetch.get(`/movies?${queryString}`);
    return response.data;
  } catch (error) {
    let errorMessage = 'Failed to get latest movies';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
}


export async function getMovieById(movieId: string) {
  try {
    const response = await serverFetch.get(`/movies/id/${movieId}`);
    return response.data;
  } catch (error) {
    let errorMessage = 'Failed to get movie by id';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
}


export async function getReviewsByMovieId(movieId: string) {
  try {
    const response = await serverFetch.get(`/reviews/movie/${movieId}`);
    return response.data;
  } catch (error) {
    let errorMessage = 'Failed to get reviews by movie id';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
}



export async function createMovie(movie: IMovie) {
  try {
    const response = await serverFetch.post('/movies', movie);
    return response.data;
  } catch (error) {
    let errorMessage = 'Failed to create movie';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
} 