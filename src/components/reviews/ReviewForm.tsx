import { FC, useState } from 'react';

interface ReviewFormProps {
    onSubmit: (rating: number, reviewText: string) => Promise<void>;
    onCancel: () => void;
    isSubmitting: boolean;
    submitError: string | null;
}

const ReviewForm: FC<ReviewFormProps> = ({
    onSubmit,
    onCancel,
    isSubmitting,
    submitError
}) => {
    const [userRating, setUserRating] = useState<number>(0);
    const [userReviewText, setUserReviewText] = useState('');
    const [hoverRating, setHoverRating] = useState<number>(0);

    const handleSubmit = () => {
        onSubmit(userRating, userReviewText);
    };

    return (
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
            <h4 className="text-xl font-semibold text-slate-100 mb-4">Your Review</h4>

            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Your Rating:</label>
                <div
                    className="flex items-center gap-1"
                    onMouseLeave={() => setHoverRating(0)}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                        <button
                            key={star}
                            onClick={() => setUserRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            className={`text-3xl transition-colors duration-150 ${(hoverRating > 0 ? star <= hoverRating : star <= userRating)
                                ? 'text-yellow-400'
                                : 'text-gray-500 hover:text-yellow-300'
                                }`}
                            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                        >
                            ★
                        </button>
                    ))}
                    {userRating > 0 && (
                        <span className="text-lg font-bold ml-2 text-yellow-400">
                            ({userRating}/10)
                        </span>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="reviewText" className="block text-sm font-medium text-slate-300 mb-1">
                    Your Review (optional):
                </label>
                <textarea
                    id="reviewText"
                    rows={4}
                    value={userReviewText}
                    onChange={(e) => setUserReviewText(e.target.value)}
                    className="w-full p-2 rounded border border-slate-600 bg-slate-700 text-slate-200 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell others what you thought..."
                />
            </div>

            {submitError && (
                <p className="text-red-500 text-sm mb-3">{submitError}</p>
            )}

            <div className="flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-500 transition-colors text-sm"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || userRating === 0}
                    className="px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </div>
        </div>
    );
};

export default ReviewForm; 