import { Star } from "lucide-react";

export const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        let fillPercentage = 0;

        if (rating >= i) {
            fillPercentage = 100;
        } else if (rating > i - 1) {
            fillPercentage = (rating - (i - 1)) * 100;
        }

        stars.push(
            <div key={i} className="relative w-4 h-4">
                {/* Empty Star */}
                <Star className="absolute text-gray-300 w-4 h-4" />

                {/* Filled Star */}
                <div
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{ width: `${fillPercentage}%` }}
                >
                    <Star className="text-yellow-400 fill-yellow-400 w-4 h-4" />
                </div>
            </div>
        );
    }

    return <div className="flex gap-0.5">{stars}</div>;
};