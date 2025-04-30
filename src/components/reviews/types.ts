// Common types used across review components

export interface User {
    _id: string | number;
    name?: string;
    avatar?: string;
    email?: string;
}

// API response structure
export interface ReviewApiResponse {
    _id: string;
    movieId: string | number;
    userId: User;
    rating: number;
    reviewText: string;
    createdAt: string;
    updatedAt?: string;
    id?: string;
}


export interface Review {
    _id: string;
    movieId: string | number;
    user: User;
    rating: number;
    reviewText: string;
    createdAt: string;
}


export const MOCK_REVIEWS: Review[] = [
    {
        _id: 'mock-1',
        movieId: 'mock',
        user: {
            _id: 'admin',
            name: 'Admin',
            avatar: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/users/1442940975i/83582._UX200_CR0,42,200,200_.jpg'
        },
        rating: 8,
        reviewText: 'This is a placeholder review. Great atmosphere!',
        createdAt: '2024-01-01T10:00:00Z',
    },
    {
        _id: 'mock-2',
        movieId: 'mock',
        user: {
            _id: 'user123',
            name: 'Jane Doe',
            avatar: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/users/1442940975i/83582._UX200_CR0,42,200,200_.jpg'
        },
        rating: 9,
        reviewText: 'Another placeholder. Engaging plot and characters.',
        createdAt: '2024-01-02T15:00:00Z',
    },
]; 