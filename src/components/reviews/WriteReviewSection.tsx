import { FC } from 'react';
import { User } from './types';

interface WriteReviewSectionProps {
    currentUser: User | null;
    hasUserReviewed: boolean;
    onWriteReviewClick: () => void;
    onLoginClick: () => void;
}

const WriteReviewSection: FC<WriteReviewSectionProps> = ({
    currentUser,
    hasUserReviewed,
    onWriteReviewClick,
    onLoginClick
}) => {
    // No user logged in - show login prompt
    if (!currentUser) {
        return (
            <div className="text-center mb-8 p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
                <p className='text-slate-300'>
                    Please <button
                        onClick={onLoginClick}
                        className='text-blue-400 cursor-pointer hover:underline font-medium'
                    >
                        log in
                    </button> to write a review.
                </p>
            </div>
        );
    }

    // User already reviewed - show message
    if (hasUserReviewed) {
        return (
            <div className="text-center mb-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                <p className='text-slate-300'>You&apos;ve already reviewed this movie.</p>
            </div>
        );
    }

    // User can review - show write review button
    return (
        <div className="mb-8 p-6 bg-gradient-to-br from-slate-900 to-primary border border-slate-700 rounded-lg text-center shadow-lg">
            <h3 className="text-2xl font-semibold text-slate-100 mb-2">
                Hi, <span className='font-bold text-secondary'>{currentUser.name}!</span>
            </h3>
            <p className="text-slate-300 mb-5 text-lg">What did you think of this movie?</p>
            <button
                onClick={onWriteReviewClick}
                className="px-8 cursor-pointer py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:from-secondary hover:to-primary transition-all duration-300 ease-in-out font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
                Write Your Review
            </button>
        </div>
    );
};

export default WriteReviewSection; 