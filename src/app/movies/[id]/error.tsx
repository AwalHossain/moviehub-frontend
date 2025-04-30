'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Movie details error:', error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center pt-20 text-white min-h-[50vh]">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <p className="mb-6">Error loading movie details. Please try again later.</p>
            <button
                onClick={
                    () => reset()
                }
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition"
            >
                Try again
            </button>
        </div>
    )
} 