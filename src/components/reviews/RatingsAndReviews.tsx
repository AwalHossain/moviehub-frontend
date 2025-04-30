"use client"
import { useAuth } from '@/provider/AuthProvider';
import { useSocket } from '@/provider/SocketProvider';
import { getReviewsByMovieId, postReview } from '@/services/server-fetch';
import { FC, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import WriteReviewSection from './WriteReviewSection';
import { MOCK_REVIEWS, Review, ReviewApiResponse, User } from './types';

interface RatingsAndReviewsProps {
    movieId: string | number;
    serverCurrentUser: User | null;
}

const RatingsAndReviews: FC<RatingsAndReviewsProps> = ({
    movieId,
    serverCurrentUser,
}) => {
    const { openLoginModal } = useAuth();
    const [fetchedReviews, setFetchedReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { socket, isConnected } = useSocket();

    useEffect(() => {
        console.log('Socket connected:', isConnected);
        console.log('Socket object:', socket);
        console.log('Listening for events on:', `movie:${movieId}:review`);
    }, [isConnected, socket, movieId]);


    useEffect(() => {
        const fetchReviews = async () => {
            if (!movieId) return;
            setIsLoading(true);
            setFetchError(null);

            try {
                const responseData = await getReviewsByMovieId(movieId as string);
                const apiReviews: ReviewApiResponse[] = responseData.data || responseData || [];
                console.log('API reviews:', apiReviews);
                const populatedReviews = apiReviews.map((r: ReviewApiResponse) => ({
                    _id: r._id,
                    movieId: r.movieId,
                    user: r.userId,
                    rating: r.rating,
                    reviewText: r.reviewText,
                    createdAt: r.createdAt,
                }));

                setFetchedReviews(populatedReviews);
            } catch (err) {
                console.error("Review fetching error:", err);
                setFetchError(err instanceof Error ? err.message : 'Could not load reviews.');
                setFetchedReviews([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReviews();
    }, [movieId]);

    useEffect(() => {
        if (!socket || !isConnected) return;
        const reviewEvent = `movie:${movieId}:review`;

        const handleNewReview = (newReview: ReviewApiResponse) => {
            console.log(newReview, 'newReview from socket');
            const transformedReview: Review = {
                _id: newReview._id,
                movieId: newReview.movieId,
                user: newReview.userId,
                rating: newReview.rating,
                reviewText: newReview.reviewText,
                createdAt: newReview.createdAt
            };
            setFetchedReviews(prev => [transformedReview, ...prev]);
        };
        socket.on(reviewEvent, handleNewReview);
        return () => {
            socket.off(reviewEvent, handleNewReview);
        };
    }, [socket, isConnected, movieId]);

    // Check if the user has reviewed the movie
    const hasUserReviewed = useMemo(() => {
        return serverCurrentUser && fetchedReviews.length > 0
            ? fetchedReviews.some(review => review.user && review.user._id === serverCurrentUser._id)
            : false;
    }, [fetchedReviews, serverCurrentUser]);

    // Display the reviews
    const reviewsToDisplay = useMemo(() => {
        return !isLoading && fetchedReviews.length > 0 ? fetchedReviews : MOCK_REVIEWS;
    }, [fetchedReviews, isLoading]);

    // Handle the write review button click
    const handleWriteReviewClick = () => {
        if (!serverCurrentUser) {
            toast.error("Please log in to write a review.");
            return;
        }
        if (hasUserReviewed) {
            toast.info("You have already reviewed this movie.");
            return;
        }
        setShowReviewForm(true);
        setSubmitError(null);
    };

    const handleCancelReview = () => {
        setShowReviewForm(false);
        setSubmitError(null);
    };

    // submit review
    const handleSubmitReview = async (rating: number, reviewText: string) => {
        setSubmitError(null);
        if (rating === 0) {
            setSubmitError("Please select a star rating.");
            return;
        }
        if (!serverCurrentUser) {
            toast.error("Authentication error. Please log in again.");
            return;
        }

        setIsSubmitting(true);

        try {
            const reviewPayload = {
                movieId: movieId as string,
                rating: rating,
                reviewText: reviewText,
            };

            const responseData = await postReview(reviewPayload);
            const savedReviewData = responseData.data || responseData || [];
            console.log('Review submitted successfully:', savedReviewData);

            toast.success("Review submitted successfully!");

            setShowReviewForm(false);
            setShowReviewForm(false);

        } catch (err) {
            console.error("Review submission error:", err);
            const errorMessage = err instanceof Error ? err.message : "Failed to submit review.";

            if (errorMessage.includes("already reviewed")) {
                toast.warning(errorMessage);
            } else {
                toast.error(errorMessage);
            }

            setSubmitError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div>
            {!showReviewForm && (
                <WriteReviewSection
                    currentUser={serverCurrentUser}
                    hasUserReviewed={hasUserReviewed}
                    onWriteReviewClick={handleWriteReviewClick}
                    onLoginClick={openLoginModal}
                />
            )}

            {showReviewForm && serverCurrentUser && (
                <ReviewForm
                    onSubmit={handleSubmitReview}
                    onCancel={handleCancelReview}
                    isSubmitting={isSubmitting}
                    submitError={submitError}
                />
            )}

            <ReviewList
                reviews={reviewsToDisplay}
                isLoading={isLoading}
                fetchError={fetchError}
            />
        </div>
    );
};

export default RatingsAndReviews; 