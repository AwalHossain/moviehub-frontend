import { IMovie } from "@/interface/movies";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import MovieWithTitleSkeleton from "./MovieWithTitleSkeleton";

interface ThumbnailProps {
    movie: IMovie;
}

const Thumbnail: FC<ThumbnailProps> = ({ movie }) => {
    if (!movie) {
        return <MovieWithTitleSkeleton />;
    }




    const roundedRating = movie.rating ? movie.rating.toFixed(1) : 'N/A';
    const defaultPosterUrl = 'https://cdn.pixabay.com/photo/2023/08/06/06/08/ai-generated-8172236_960_720.png';

    const imageSrc =
        (movie.poster && movie.poster.trim() !== '') ? movie.poster :
            (movie.backdrop && movie.backdrop.trim() !== '') ? movie.backdrop :
                defaultPosterUrl;

    return (
        <Link href={`/movies/${movie._id}`} className="block group">
            <div
                className="bg-[#1a1a1a] rounded-lg overflow-hidden cursor-pointer transition duration-200 ease-in transform hover:z-50 sm:group-hover:scale-105"
            >
                <div className="relative w-full aspect-[2/3] rounded-t-lg overflow-hidden">
                    <Image
                        fill
                        sizes="(max-width: 750px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        src={imageSrc}
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