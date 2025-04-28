const SkeletonMovieDetailsHeader = () => {
    return (
        <div role="status" className="animate-pulse w-full text-white overflow-hidden mb-16">
            <div className="relative w-full bg-slate-800 min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh]">
                <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-32 md:pb-20">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        <div className="flex-shrink-0 w-[180px] md:w-[240px] lg:w-[280px] self-center md:self-start rounded-lg bg-gray-700 aspect-[2/3]">
                        </div>
                        {/* Skeleton Content Area */}
                        <div className="flex-auto mt-4 md:mt-0 w-full">
                            <div className="h-10 md:h-14 lg:h-16 bg-gray-700 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-700 rounded w-1/2 mb-6"></div>
                            {/* Skeleton Genres */}
                            <div className="flex flex-wrap gap-2 my-4">
                                <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
                                <div className="h-6 w-24 bg-gray-700 rounded-full"></div>
                                <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                            </div>

                            <div className="h-5 w-40 bg-gray-700 rounded my-6"></div>

                            {/* Skeleton Header */}
                            <div className="h-6 w-32 bg-gray-700 rounded mb-3 mt-8"></div>
                            {/* Skeleton Text */}
                            <div className="space-y-2.5">
                                <div className="h-4 bg-gray-700 rounded w-full"></div>
                                <div className="h-4 bg-gray-700 rounded w-[90%]"></div>
                                <div className="h-4 bg-gray-700 rounded w-[80%]"></div>
                                <div className="h-4 bg-gray-700 rounded w-[85%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Optional: Skeleton for Reviews section (basic placeholder) */}
            <div className="bg-black relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 border-t border-slate-700">
                    <div className="h-8 w-48 bg-gray-700 rounded mb-6"></div>
                    {/* Placeholder for a few review items */}
                    <div className="h-20 bg-gray-700/50 rounded mb-4"></div>
                    <div className="h-20 bg-gray-700/50 rounded mb-4"></div>
                </div>
            </div>

            <span className="sr-only">Loading...</span>
        </div>
    );
};

// Rename export to match the new component name if desired
export default SkeletonMovieDetailsHeader;