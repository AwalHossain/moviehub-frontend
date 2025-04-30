import SearchResults from "@/components/search/SearchResults";
import { getMovies } from "@/services/server-fetch";
import { Suspense } from "react";

interface SearchPageProps {
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function SearchPage({ searchParams = {} }: SearchPageProps) {
    const queryParam = searchParams.query;
    const query = typeof queryParam === 'string' ? queryParam : Array.isArray(queryParam) ? queryParam[0] : "";

    if (!query) {
        return (
            <div className="min-h-screen bg-custom-dark pt-28 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-8">Search Movies</h1>
                    <p className="text-gray-300 text-xl">Enter a search term to find movies.</p>
                </div>
            </div>
        );
    }

    const { data } = await getMovies({
        page: 1,
        limit: 20,
        searchTerm: query,
        sortBy: "title",
        sortOrder: "asc"
    });

    return (
        <div className="min-h-screen bg-custom-dark pt-28 px-4 md:px-8 ">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-2">Search Results</h1>
                <p className="text-gray-300 mb-8">Showing results for: &quot;{query}&quot;</p>

                <Suspense fallback={<div className="text-white">Loading results...</div>}>
                    <SearchResults initialData={data?.data || []} searchQuery={query} />
                </Suspense>
            </div>
        </div>
    );
} 