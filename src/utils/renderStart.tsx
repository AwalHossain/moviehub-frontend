import { Star } from "lucide-react";


export const renderReviewStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = Math.max(0, 10 - fullStars);

    return (
        <div className="flex items-center text-yellow-400 text-sm">
            {[...Array(fullStars)].map((_, i) => <Star size={12} className="text-yellow-400 fill-yellow-400" key={`fstar-${i}`} />)}
            {[...Array(emptyStars)].map((_, i) => <Star size={12} className="text-gray-400" key={`estar-${i}`} />)}
            {rating > 0 && <span className="text-xs font-semibold ml-2 text-yellow-400">({rating}/10)</span>}
        </div>
    );
};