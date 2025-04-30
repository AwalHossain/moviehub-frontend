import { IMovie } from "@/interface/movies";
import Thumbnail from "./Thumbnail";

interface MovieGridProps {
    movies: Partial<IMovie>[];
    title?: string;
}

const MovieGrid = ({ movies, title }: MovieGridProps) => {
    if (!movies || movies.length === 0) {
        return (
            <div className="py-8 text-center">
                <p className="text-white text-lg">No movies found.</p>
            </div>
        );
    }

    return (
        <div className="py-4">
            {title && (
                <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <Thumbnail key={movie._id} movie={movie as IMovie} />
                ))}
            </div>
        </div>
    );
};

export default MovieGrid; 