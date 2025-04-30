"use client"
import useIsMobile from "@/hooks/isMobile";
import { IMovie } from "@/interface/movies";
import { useAuth } from "@/provider/AuthProvider";
import { getYear } from "@/utils/formateDate";
import { renderReviewStars } from '@/utils/renderStart';
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import RatingsAndReviews from '../reviews/RatingsAndReviews';
import SkeletonMovieDetailsHeader from "../skeleton/SkeletonLoaderImageWithText";


interface MovieDetailsTopContentProps {
    movieDetails: IMovie;
}



const MovieDetailsTopContent: FC<MovieDetailsTopContentProps> = ({
    movieDetails,
}) => {
    const [showSkeleton, setShowSkeleton] = useState(true);
    const isMobile = useIsMobile();
    const { user, isLoading } = useAuth();



    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (showSkeleton) {
        return <SkeletonMovieDetailsHeader />;
    }

    const baseBackdropStyle: React.CSSProperties = {
        backgroundImage: movieDetails.backdrop
            ? `url(${movieDetails.backdrop})`
            : undefined,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    const desktopBackdropStyle: React.CSSProperties = {
        ...baseBackdropStyle,
        backgroundPosition: 'right 65% top 10%',
        backgroundAttachment: 'fixed',
    };

    const mobileBackdropStyle: React.CSSProperties = {
        ...baseBackdropStyle,
        backgroundPosition: 'right 45% top 10%',
        backgroundAttachment: 'scroll',
    };

    const backdropStyle = movieDetails.backdrop
        ? (isMobile ? mobileBackdropStyle : desktopBackdropStyle)
        : {};

    const displayRating = movieDetails.rating;

    return (
        <div className="relative w-full text-white overflow-hidden mb-16">
            <div
                className="absolute inset-0 z-0 min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh]"
                style={backdropStyle}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-black/60 z-0"></div>
            </div>


            <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-32 md:pb-20">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                    {/* Poster Image */}
                    <div className="flex-shrink-0 w-[180px] md:w-[240px] lg:w-[280px] self-center md:self-start shadow-xl shadow-black/40 rounded-lg overflow-hidden border-2 border-white/10">
                        {movieDetails.poster ? (
                            <Image
                                src={movieDetails.poster}
                                alt={`${movieDetails.title} poster`}
                                className="w-full h-auto object-cover block"
                                width={300}
                                height={450}
                            />
                        ) : (
                            <div className="w-full aspect-[2/3] bg-slate-700 flex items-center justify-center text-slate-400 rounded-lg">
                                <span className="text-sm">No Poster</span>
                            </div>
                        )}
                    </div>

                    <div className="flex-auto mt-4 md:mt-0">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 shadow-black/50 [text-shadow:1px_2px_4px_var(--tw-shadow-color)]">
                            {movieDetails.title}
                            {movieDetails.release_date && (
                                <span className="font-normal text-3xl sm:text-4xl lg:text-5xl text-slate-300 ml-2">
                                    ({getYear(movieDetails.release_date)})
                                </span>
                            )}
                        </h1>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 my-4">
                            {movieDetails.genres?.map((genre) => (
                                <span
                                    className="text-xs md:text-sm px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-slate-200 shadow-sm"
                                    key={genre}
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>

                        {/* Rating */}
                        {typeof displayRating === 'number' && !isNaN(displayRating) && (
                            <div className="flex items-center gap-4 my-5">
                                {renderReviewStars(displayRating)}
                            </div>
                        )}

                        {/* Storyline */}
                        <div className="movie-storyline mt-6 max-w-3xl">
                            <h5 className="text-xl font-semibold text-slate-100 mb-2">Overview</h5>
                            <p className="text-base md:text-lg text-slate-200 leading-relaxed [text-shadow:1px_1px_1px_var(--tw-shadow-black)]">
                                {movieDetails.overview || "No overview available."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Ratings & Reviews Section --- */}
            <div className="bg-custom-dark relative z-10">
                <div className="ratings-reviews-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 border-t border-slate-700">
                    <h3 className="text-2xl font-bold text-white mb-6">Ratings & Reviews</h3>
                    <RatingsAndReviews
                        movieId={movieDetails._id}
                        serverCurrentUser={user}
                    />
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsTopContent; 