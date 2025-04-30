"use client"
import { MultiSelect } from "@/components/ui/multi-select";
import { IMovie, genreOptions } from "@/interface/movies";
import { useSocket } from "@/provider/SocketProvider";
import { createMovie } from "@/services/server-fetch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Movie interface

const MovieForm = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { socket, isConnected } = useSocket();

    // Form state
    const [formData, setFormData] = useState<Partial<IMovie>>({
        title: "",
        overview: "",
        release_date: null,
        runtime: null,
        genres: [],
        poster: "",
        backdrop: ""
    });

    // Preview state
    const [posterPreview, setPosterPreview] = useState<string | null>(null);
    const [backdropPreview, setBackdropPreview] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Update previews for image URLs
        if (name === 'poster' && value) {
            setPosterPreview(value);
        } else if (name === 'poster' && !value) {
            setPosterPreview(null);
        }

        if (name === 'backdrop' && value) {
            setBackdropPreview(value);
        } else if (name === 'backdrop' && !value) {
            setBackdropPreview(null);
        }
    };

    useEffect(() => {
        console.log('Socket connected:', isConnected);
        console.log('Socket object:', socket);
        console.log('Listening for events on:', `movie:added`);
    }, [isConnected, socket]);


    useEffect(() => {
        if (!isConnected || !socket) return;
        socket.on("movie:added", (movie: IMovie) => {
            console.log("Movie created: from socket", movie);
            console.log("About to redirect to home page");
            toast.success("Movie created successfully from socket!");
            // redirect("/");
            console.log("Redirect triggered");
        });
        return () => {
            socket?.off("movie:added");
        };
    }, [isConnected, socket, router]);

    // Handle number input changes
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value ? parseInt(value) : null
        });
    };

    // Handle date input changes
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value ? new Date(value) : null
        });
    };

    // Handle genre selection
    const handleGenreChange = (selectedGenres: string[]) => {
        setFormData({
            ...formData,
            genres: selectedGenres
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title) {
            toast.error("Movie title is required");
            return;
        }

        if (!formData.genres || formData.genres.length === 0) {
            toast.error("Please select at least one genre");
            return;
        }

        setIsSubmitting(true);

        try {
            console.log("Submitting movie data:", formData);

            // Simulate API call
            const movie = await createMovie(formData);
            console.log("Movie created:", movie);
            // router.push("/");
        } catch (error) {
            console.error("Error adding movie:", error);
            toast.error("Failed to add movie. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };





    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
                    Movie Title <span className="text-red-500">*</span>
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-primary focus:border-primary"
                    placeholder="Enter movie title"
                />
            </div>

            {/* Overview */}
            <div>
                <label htmlFor="overview" className="block text-sm font-medium text-slate-300 mb-1">
                    Overview
                </label>
                <textarea
                    id="overview"
                    name="overview"
                    rows={4}
                    value={formData.overview || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-primary focus:border-primary"
                    placeholder="Enter movie overview/description"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Release Date */}
                <div>
                    <label htmlFor="release_date" className="block text-sm font-medium text-slate-300 mb-1">
                        Release Date
                    </label>
                    <input
                        id="release_date"
                        name="release_date"
                        type="date"
                        value={formData.release_date ? new Date(formData.release_date).toISOString().split('T')[0] : ""}
                        onChange={handleDateChange}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-primary focus:border-primary"
                    />
                </div>

                {/* Runtime */}
                <div>
                    <label htmlFor="runtime" className="block text-sm font-medium text-slate-300 mb-1">
                        Runtime (minutes)
                    </label>
                    <input
                        id="runtime"
                        name="runtime"
                        type="number"
                        min="1"
                        value={formData.runtime || ""}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-primary focus:border-primary"
                        placeholder="e.g. 120"
                    />
                </div>
            </div>

            {/* Genres - using the new MultiSelect */}
            <div>
                <label htmlFor="genres" className="block text-sm font-medium text-slate-300 mb-1">
                    Genres <span className="text-red-500">*</span>
                </label>
                <MultiSelect
                    options={genreOptions}
                    onValueChange={handleGenreChange}
                    defaultValue={formData.genres}
                    placeholder="Select genres"
                    variant="inverted"
                    maxCount={5}
                />
                {formData?.genres?.length === 0 && (
                    <p className="text-xs text-red-400 mt-1">Please select at least one genre</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Poster URL */}
                <div>
                    <label htmlFor="poster" className="block text-sm font-medium text-slate-300 mb-1">
                        Poster URL
                    </label>
                    <input
                        id="poster"
                        name="poster"
                        type="url"
                        value={formData.poster || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-primary focus:border-primary"
                        placeholder="https://example.com/poster.jpg"
                    />

                    {posterPreview && (
                        <div className="mt-2 relative">
                            <div className="w-24 h-36 border border-slate-700 rounded-lg overflow-hidden">
                                <Image
                                    src={posterPreview}
                                    alt="Poster preview"
                                    className="w-full h-full object-cover"
                                    onError={() => setPosterPreview(null)}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Poster Preview</p>
                        </div>
                    )}
                </div>

                {/* Backdrop URL */}
                <div>
                    <label htmlFor="backdrop" className="block text-sm font-medium text-slate-300 mb-1">
                        Backdrop URL
                    </label>
                    <input
                        id="backdrop"
                        name="backdrop"
                        type="url"
                        value={formData.backdrop || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-primary focus:border-primary"
                        placeholder="https://example.com/backdrop.jpg"
                    />

                    {backdropPreview && (
                        <div className="mt-2 relative">
                            <div className="w-full h-20 border border-slate-700 rounded-lg overflow-hidden">
                                <Image
                                    src={backdropPreview}
                                    alt="Backdrop preview"
                                    className="w-full h-full object-cover"
                                    onError={() => setBackdropPreview(null)}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Backdrop Preview</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-end pt-4">
                <button
                    type="button"
                    onClick={() => router.push("/dashboard")}
                    className="mr-4 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-6 cursor-pointer py-2 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 text-white rounded-lg shadow-md"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Saving..." : "Save Movie"}
                </button>
            </div>
        </form>
    );
};

export default MovieForm; 