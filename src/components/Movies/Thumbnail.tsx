import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import MovieWithTitleSkeleton from "./MovieWithTitleSkeleton";


export interface MovieData {
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
    cast: { name: string; character: string; profile_path: string | null }[];
}

interface ThumbnailProps {
    movie: MovieData;
}

const Thumbnail: FC<ThumbnailProps> = ({ movie }) => {


    if (!movie) {
        return <MovieWithTitleSkeleton />;
    }


    const roundedRating = movie.rating ? movie.rating.toFixed(1) : 'N/A';

    return (
        <Link href={`/movies/${movie.tmdb_id}`} className="block group">
            <div
                className="bg-[#1a1a1a] rounded-lg overflow-hidden cursor-pointer transition duration-200 ease-in transform hover:z-50 sm:group-hover:scale-105"
            >
                <div className="relative w-full aspect-[2/3] rounded-t-lg overflow-hidden">
                    <Image
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        src={movie.poster || movie.backdrop}
                        alt={movie.title}
                        priority={true}
                        className="object-cover"
                    />
                </div>

                <div className="p-3 text-white">
                    {/* Rating Line */}
                    <div className="flex items-center gap-2 mb-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-gray-300 font-medium">{roundedRating}</span>
                    </div>
                    <h2
                        className="font-semibold text-base text-white truncate"
                        title={movie.title}
                    >
                        {movie.title}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default Thumbnail; 