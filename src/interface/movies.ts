

export interface IMovie {
    _id: string;
    tmdb_id: number;
    title: string;
    overview: string;
    release_date: string;
    rating: number;
    runtime: number;
    genres: string[];
    poster: string;
    backdrop: string;
    popularity: number;
    vote_count: number;
    source_category: string | null;
    averageUserRating: number | null;
    userReviewCount: number | null;
    createdAt: Date;
    updatedAt: Date;
    cast: { name: string; character: string; profile_path: string | null }[];
}