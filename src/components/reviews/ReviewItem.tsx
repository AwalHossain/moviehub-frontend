import { formatReviewDate } from '@/utils/formateDate';
import { renderReviewStars } from '@/utils/renderStart';
import Image from 'next/image';
import { FC } from 'react';
import { Review } from './types';

interface ReviewItemProps {
    review: Review;
}

const ReviewItem: FC<ReviewItemProps> = ({ review }) => {
    const avatarUrl = review.user.avatar || 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/users/1442940975i/83582._UX200_CR0,42,200,200_.jpg';

    return (
        <div className={`flex gap-4 border-b border-slate-700 pb-4 last:border-b-0 ${review.movieId === 'mock' ? 'opacity-70' : ''}`}>
            <div className="flex-shrink-0">
                <Image
                    width={40}
                    height={40}
                    src={avatarUrl}
                    alt={`${review.user.name || 'User'}'s avatar`}
                    className="w-10 h-10 rounded-full border border-slate-600 object-cover"
                />
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-center mb-1 flex-wrap">
                    <span className="font-semibold text-slate-100 mr-2">{review.user.name || 'Anonymous'}</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                        Reviewed on {formatReviewDate(review.createdAt ?? '')}
                    </span>
                </div>
                {renderReviewStars(review.rating)}
                <p className="text-slate-300 mt-2 text-sm leading-relaxed">{review.reviewText}</p>
            </div>
        </div>
    );
};

export default ReviewItem;