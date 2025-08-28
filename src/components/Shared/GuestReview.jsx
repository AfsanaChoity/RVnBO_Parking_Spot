import { ChevronDown, Flag } from "lucide-react";
import { Divider } from "@mui/material";
import { useState } from "react";
import TealButton from "../common/TealButton";
import ReviewModal from "../Traveler/ReviewModal";
import HeadingSmall from "../common/HeadingSmall";

function getRatingText(rating) {
    if (!rating || rating === 0) return "No Rating";
    if (rating < 2) return "Poor";
    if (rating < 3) return "Fair";
    if (rating < 4) return "Good";
    if (rating < 4.5) return "Very Good";
    return "Excellent";
}

export default function GuestReview({ role, ratingsAndReviews, averageRating, totalRatings, landId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5); // Show 3 reviews initially

    const handleReportReview = (reviewId) => {
        console.log("Report review with ID: ", reviewId);
    };

    const handleShowMore = () => {
        // Increase visible count by 3 more reviews each click
        setVisibleCount((prev) => prev + 5);
    };

    // Slice the reviews based on visibleCount
    const visibleReviews = ratingsAndReviews.slice(0, visibleCount);

    return (
        <div className="">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row mb-8 md:items-center justify-between gap-4">
                <HeadingSmall text="Reviews" />
                {role === "traveler" && (
                    <TealButton text="Write a Review" onClick={() => setIsModalOpen(true)} />
                )}
            </div>

            {/* Overall Rating */}
            <div className="mb-8">
                <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold text-gray-900">{averageRating || "0"}</span>
                    <div>
                        <div className="text-lg font-semibold text-gray-900">{getRatingText(averageRating)}</div>
                        <div className="text-sm text-gray-600">{totalRatings || "0"} verified reviews</div>
                    </div>
                </div>
            </div>

            <Divider className="" />

            {/* Reviews List */}
            <div className="pt-6 space-y-6">
                {visibleReviews.map((review) => (
                    <div key={review.id} className="flex gap-4">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <img
                                src={review?.user?.image || "/placeholder.svg"}
                                alt={`${review?.user?.name} avatar`}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </div>

                        {/* Review Content */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div className="md:flex space-x-1 items-center gap-3">
                                    <span className="font-semibold text-gray-900">{review?.rating}</span>
                                    <span className="font-semibold text-gray-900">{getRatingText(review?.rating)}</span>
                                    <span className="text-gray-600">|</span>
                                    <span className="text-gray-700">{review?.user?.name}</span>
                                </div>
                                <button
                                    onClick={() => handleReportReview(review.id)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <Flag className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4">{review?.review}</p>

                            <Divider className="" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Show more */}
            {visibleCount < ratingsAndReviews.length && (
                <div className="flex justify-center mb-8">
                    <button
                        onClick={handleShowMore}
                        className="flex items-center gap-2 text-[#112211] font-semibold hover:underline cursor-pointer"
                    >
                        Show more
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Modal */}
            <ReviewModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                landId={landId} 
            />
        </div>
    );
}
