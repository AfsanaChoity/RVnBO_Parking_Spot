import HeadingSmall from "../../components/common/HeadingSmall";
import { useGetAllReviewsQuery } from "../../redux/api/landownerApi";
import { toast } from "react-hot-toast"; // Import toast from React Hot Toast
import { useEffect } from "react"; // Import useEffect
import LoadingComponent from "../../components/common/LoadingComponent";

export default function ReviewsTable() {
  const { data, isLoading, error } = useGetAllReviewsQuery();

  

  // Show loading spinner when fetching data
  if (isLoading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  // If there is an error, display the error message instead of the reviews
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="font-semibold text-lg text-gray-600">
          {error?.data?.message}
        </p>
      </div>
    );
  }

  // Handle empty reviews array, but only after checking if there's no error
  if (!data?.reviews || data.reviews.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="font-semibold text-lg text-gray-600">No reviews yet</p>
      </div>
    );
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <HeadingSmall text="All Reviews" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-5 text-left text-sm font-medium text-gray-700 w-1/4">
                Guest Name
              </th>
              <th className="px-6 py-5 text-left text-sm font-medium text-gray-700 w-1/4">
                Spot Name
              </th>
              <th className="px-6 py-5 text-center text-sm font-medium text-gray-700 w-1/6">
                Rating
              </th>
              <th className="px-6 py-5 text-left text-sm font-medium text-gray-700 w-2/4">
                Reviews
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.reviews?.map((review, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? "bg-blue-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-5 text-sm text-gray-900">{review?.travelerName}</td>
                <td className="px-6 py-5 text-sm text-gray-900">{review?.spotName}</td>
                <td className="px-6 py-5 text-sm text-yellow-500 text-center">
                  {"★".repeat(review?.rating)}
                </td>
                <td className="px-6 py-5 text-sm text-gray-900">{review?.review}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Scroll Indicator for Mobile */}
        <div className="text-center mt-2 text-xs text-gray-500 md:hidden">
          Swipe left to see more columns →
        </div>
      </div>
    </div>
  );
}
