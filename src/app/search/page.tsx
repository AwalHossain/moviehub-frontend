"use client";

import SearchResults from "@/components/search/SearchResults";
import { getMovies } from "@/services/client-fetch";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get("query");
    const query = queryParam || "";
    const [initialData, setInitialData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!query) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await getMovies({
                    page: 1,
                    limit: 20,
                    searchTerm: query,
                    sortBy: "title",
                    sortOrder: "asc"
                });

                setInitialData(data?.data || []);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [query]);

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

    return (
        <div className="min-h-screen bg-custom-dark pt-28 px-4 md:px-8 ">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-2">Search Results</h1>
                <p className="text-gray-300 mb-8">Showing results for: &quot;{query}&quot;</p>

                {loading ? (
                    <div className="text-white">Loading results...</div>
                ) : (
                    <SearchResults initialData={initialData} searchQuery={query} />
                )}
            </div>
        </div>
    );
} 