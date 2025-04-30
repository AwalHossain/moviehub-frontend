import { FC } from 'react';
import ReviewItem from './ReviewItem';
import { Review } from './types';

interface ReviewListProps {
    reviews: Review[];
    isLoading: boolean;
    fetchError: string | null;
}

const ReviewList: FC<ReviewListProps> = ({ reviews, isLoading, fetchError }) => {
    if (isLoading) {
        return <p className="text-slate-400 text-center py-4">Loading reviews...</p>;
    }

    if (fetchError) {
        return <p className="text-red-500 text-center py-4">Error loading reviews: {fetchError}</p>;
    }

    if (reviews.length === 0) {
        return <p className="text-slate-400 text-center py-4">No reviews available.</p>;
    }

    return (
        <div className="space-y-6">
            {reviews
                .filter(review => review && review.user)
                .map((review) => (
                    <ReviewItem key={review._id} review={review} />
                ))}
        </div>
    );
};

export default ReviewList; 