import MovieDetailsTopContent from "@/components/movieDetails/MovieDetailsTopContent";
import { getMovieById } from "@/services/server-fetch";
import { notFound } from "next/navigation";

type MovieDetailsProps = {
    params: Promise<{ id: string }>;
};

export default async function MovieDetails({ params }: MovieDetailsProps) {
    const { id } = await params;

    const { data: movieDetails } = await getMovieById(id);

    if (!movieDetails) {
        return notFound();
    }

    return (
        <div className="bg-custom-dark min-h-screen">
            <MovieDetailsTopContent movieDetails={movieDetails} />
        </div>
    );
}
