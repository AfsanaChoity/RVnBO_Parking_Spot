import { Link } from "react-router";
import HeadingSmall from "../common/HeadingSmall";

const BookingTable = ({ spot }) => {
  
  if (!spot || spot.length === 0) {
    return <div  className="text-center"><HeadingSmall text="No bookings found"></HeadingSmall></div>;
  }

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <div className="min-w-[600px] rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 px-4 md:px-6 py-3 border-b border-gray-200 ">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5 ">
                <span className="text-sm font-medium text-gray-700">Spot</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm font-medium text-gray-700">Price</span>
              </div>
              <div className="col-span-3  text-center">
                <span className="text-sm font-medium text-gray-700">Booking Date</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-sm font-medium text-gray-700">Spot Details</span>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {spot.map((booking, index) => (
              <div
                key={booking.id}
                className={`px-4 md:px-6 py-4 hover:bg-gray-50 transition-colors bg-[#fff]`}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Place Column */}
                  <div className="col-span-5 ">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <img
                          src={booking.land.image || "/placeholder.svg"}
                          alt={booking.land.spot}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover border border-gray-200"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                          {booking.land.spot}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          </div>
                          <span className="text-xs md:text-sm text-gray-600 truncate">{booking.land.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Column */}
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-gray-700">{booking.price || "N/A"}$</span>
                  </div>

                  {/* Booking Date Column */}
                  <div className="col-span-3 text-center">
                    <span className="text-xs md:text-sm text-gray-600">{new Date(booking.bookingDate).toLocaleString()}</span>
                  </div>

                  {/* Status Column */}
                  <div className="col-span-2 text-center">
                    <Link to={`/traveler/booking/details/${booking?.id}`}
                      className="text-[#8AC197] hover:text-green-800 text-xs md:text-sm font-medium transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
