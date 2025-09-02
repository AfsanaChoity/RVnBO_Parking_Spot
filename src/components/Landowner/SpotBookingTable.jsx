import { Link } from "react-router-dom"

export default function SpotBookingTable({ bookingDetails }) {
    
    // console.log(bookingDetails)

  

  return (
    <div className="w-full">
      {/* Table Container - Scrollable on small devices */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] ">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Guest Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Spot Name</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Booking Date</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Booking Year</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Contact</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {bookingDetails?.map((booking, index) => (
              <tr
                key={booking.id}
                className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? "bg-blue-50" : "bg-white"
                }`}
              >
                {/* Guest Name */}
                <td className="px-6 py-4 text-sm text-gray-900">{booking.traveler?.name}</td>

                {/* Spot Name */}
                <td className="px-6 py-4 text-sm text-gray-900">{booking.spotName}</td>

                {/* Date Range */}
                <td className="px-6 py-4 text-center text-sm text-gray-900">{booking.bookingDateRange}</td>


                {/* Action */}
                <td className="px-6 py-4 text-center text-sm text-gray-900">{booking.bookingYear}</td>

                    {/* Chat Option */}
                 <td className="px-6 py-4 text-center">
                 
                  <Link to="/inbox" state={{traveler: booking?.traveler}}><span className="text-[#0a697c]">Message</span></Link>
                </td>
              </tr>
            ))}
          </tbody>

           
        </table>
        {/* Scroll Indicator for Mobile */}
      <div className="md:hidden text-center mt-2 text-xs text-gray-500">Swipe left to see more columns →</div>

      </div>
      
    </div>
  )
}
