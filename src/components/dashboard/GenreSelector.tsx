"use client"
import { FC } from "react";

interface GenreSelectorProps {
    selectedGenres: string[];
    onChange: (genres: string[]) => void;
}

// Common genre options
const genreOptions = [
    "Action", "Adventure", "Animation", "Comedy", "Crime",
    "Documentary", "Drama", "Family", "Fantasy", "History",
    "Horror", "Music", "Mystery", "Romance", "Science Fiction",
    "Thriller", "War", "Western"
];

const GenreSelector: FC<GenreSelectorProps> = ({ selectedGenres, onChange }) => {
    const toggleGenre = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            onChange(selectedGenres.filter(g => g !== genre));
        } else {
            onChange([...selectedGenres, genre]);
        }
    };

    return (
        <div className="space-y-2">
            <div className="text-sm font-medium text-slate-300 mb-2">
                Genres <span className="text-red-500">*</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {genreOptions.map(genre => (
                    <div key={genre} className="flex items-center">
                        <div
                            onClick={() => toggleGenre(genre)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${selectedGenres.includes(genre)
                                ? "bg-primary/20 border-primary text-white"
                                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                } border border-slate-700`}
                        >
                            <div className={`w-4 h-4 flex-shrink-0 rounded border ${selectedGenres.includes(genre)
                                ? "bg-primary border-primary"
                                : "border-slate-600"
                                } flex items-center justify-center`}>
                                {selectedGenres.includes(genre) && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </div>
                            <span className="text-sm">{genre}</span>
                        </div>
                    </div>
                ))}
            </div>

            {selectedGenres.length === 0 && (
                <p className="text-xs text-red-400 mt-1">Please select at least one genre</p>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
                {selectedGenres.length > 0 && (
                    <>
                        <div className="text-xs text-slate-400">Selected:</div>
                        {selectedGenres.map(genre => (
                            <span
                                key={genre}
                                className="inline-flex items-center gap-1 text-xs bg-primary/20 text-white px-2 py-1 rounded-full"
                            >
                                {genre}
                                <button
                                    onClick={() => toggleGenre(genre)}
                                    className="hover:text-red-400"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default GenreSelector; 