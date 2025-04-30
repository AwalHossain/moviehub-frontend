import axios, { AxiosError } from 'axios';

export const clientFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});


interface SearchMovieParams {
  searchTerm?: string;
  filter?: Record<string, string | number | boolean>;
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

  try {
    const response = await clientFetch.get(`/movies?${queryString}`);
    return response.data;
  } catch (error) {
    let errorMessage = 'Failed to get movies';
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
    const response = await clientFetch.get(`/movies/id/${movieId}`);
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


