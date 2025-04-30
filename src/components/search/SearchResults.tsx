"use client";

import { IMovie } from "@/interface/movies";
import { getMovies } from "@/services/client-fetch";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Thumbnail from "../Movies/Thumbnail";
import { Button } from "../ui/button";

interface SearchResultsProps {
    initialData: Partial<IMovie>[];
    searchQuery: string;
}

const SearchResults = ({ initialData, searchQuery }: SearchResultsProps) => {
    const [movies, setMovies] = useState<Partial<IMovie>[]>(initialData);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialData.length >= 20);

    const loadMoreResults = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const nextPage = page + 1;
            const { data } = await getMovies({
                page: nextPage,
                limit: 20,
                searchTerm: searchQuery,
                sortBy: "title",
                sortOrder: "asc"
            });

            const newMovies = data?.data || [];

            if (newMovies.length > 0) {
                setMovies(prevMovies => [...prevMovies, ...newMovies]);
                setPage(nextPage);
                setHasMore(newMovies.length >= 20);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error loading more results:", error);
        } finally {
            setLoading(false);
        }
    };

    // If there are no results, show a message
    if (movies.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-2xl text-white font-semibold mb-4">No results found</h3>
                <p className="text-gray-300">
                    We couldn&apos;t find any movies matching &quot;{searchQuery}&quot;
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <Thumbnail key={movie._id} movie={movie as IMovie} />
                ))}
            </div>

            {hasMore && (
                <div className="mt-10 text-center">
                    <Button
                        onClick={loadMoreResults}
                        disabled={loading}
                        className="px-8 py-2 bg-primary hover:bg-primary/80 text-white rounded-xl"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            'Load More'
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SearchResults; 