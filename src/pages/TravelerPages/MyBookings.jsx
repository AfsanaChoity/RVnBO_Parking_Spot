import React, { useState } from 'react'
import HeadingSmall from '../../components/common/HeadingSmall'
import { useGetBookingSpotsQuery } from '../../redux/api/travelerApi';
import { ChevronRight } from '@mui/icons-material';
import BookingTable from '../../components/Traveler/BookingTable';

export default function MyBookings() {
  const [showAll, setShowAll] = useState(false);

  const { data, error, isLoading } = useGetBookingSpotsQuery();

  const handleViewToggleClick = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <HeadingSmall text="My Bookings"></HeadingSmall>
        <button
          onClick={handleViewToggleClick} // Toggle the view
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
        >
          <span className="text-sm md:text-base font-medium">
            {showAll ? 'View less' : 'Show All'} {/* Toggle the button text */}
          </span>
          <ChevronRight className={`w-4 h-4 transform ${showAll ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Booking Table */}
      <div>
        {/* Pass the fetched spot data and the showAll state to BookingTable */}
        <BookingTable spots={showAll ? data?.bookings : data?.bookings.slice(0, 7)} />

        <div className="md:hidden text-center mt-2 text-xs text-gray-500">Swipe left to see more columns →</div>
      </div>

    </div>
  )
}
