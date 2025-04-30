import { OptionType } from "@/components/ui/multi-select";


export interface IMovie {
    _id: string;
    tmdb_id: number;
    title: string;
    overview: string;
    release_date: string | null;
    rating: number;
    runtime: number | null;
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

export interface IMovieCreation {
    title: string;
    overview: string;
    release_date: string | null;
    runtime: number | null;
    genres: string[];
    poster: string;
    backdrop: string;
}


export const genreOptions: OptionType[] = [
    { value: "Action", label: "Action" },
    { value: "Adventure", label: "Adventure" },
    { value: "Animation", label: "Animation" },
    { value: "Comedy", label: "Comedy" },
    { value: "Crime", label: "Crime" },
    { value: "Documentary", label: "Documentary" },
    { value: "Drama", label: "Drama" },
    { value: "Family", label: "Family" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "History", label: "History" },
    { value: "Horror", label: "Horror" },
    { value: "Music", label: "Music" },
    { value: "Mystery", label: "Mystery" },
    { value: "Romance", label: "Romance" },
    { value: "Science Fiction", label: "Science Fiction" },
    { value: "Thriller", label: "Thriller" },
    { value: "War", label: "War" },
    { value: "Western", label: "Western" },
];
