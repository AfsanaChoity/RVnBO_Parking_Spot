import { useState } from "react";
import calander from '../../assets/icons/Calender.png';
import tick from '../../assets/icons/tick2.png';
import cross from '../../assets/icons/cross.png';
import HeadingSmall from '../../components/common/HeadingSmall';
import SubHeading from '../../components/common/SubHeading';
import BookingTable from '../../components/Traveler/BookingTable';
import DashboardFlexBox from '../../components/Shared/DashboardFlexBox';
import { ChevronRight } from '@mui/icons-material';
import LoadingComponent from "../../components/common/LoadingComponent";
import { useGetBookingSpotsQuery } from "../../redux/api/travelerApi";
import { useGetUserQuery } from "../../redux/api/authApi";

export default function TravelerDashboard() {
  const [showAll, setShowAll] = useState(false); 
  const { data, error, isLoading } = useGetBookingSpotsQuery(); 

  const { data: userData, error: userError, isLoading: userIsLoading } = useGetUserQuery();

  

  const handleViewToggleClick = () => {
    setShowAll(!showAll); 
  };

  // Handle loading state
  if (isLoading) {
    return <div><LoadingComponent/></div>;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching booking spots.</div>;
  }

  if(userIsLoading) {
    return <div><LoadingComponent/></div>;
  }

  if(userError) {
    return <div>{userError}</div>
  }

  

  return (
    <div>
      <div>
        <HeadingSmall text={`Hello, ${userData?.user?.name}`}></HeadingSmall>
      </div>

      <div className="mt-4 mb-10">
        <SubHeading text="Ready for your next adventure"></SubHeading>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardFlexBox heading={data?.totalBookings} subHeading="Total Booking" icon={calander} color="#E7F0FA"></DashboardFlexBox>
        <DashboardFlexBox heading={data?.completedBookings} subHeading="Completed" icon={tick} color="#FFF6E6"></DashboardFlexBox>
        <DashboardFlexBox heading={data?.cancelledBookings} subHeading="Canceled Booking" icon={cross} color="#E6E6E6"></DashboardFlexBox>
      </div>

      {/* Table Heading */}
      <div className="flex items-center justify-between mb-6 mt-10">
        <h2 className="md:text-xl font-semibold text-gray-900">Recent Bookings</h2>
        <button
          onClick={handleViewToggleClick} // Toggle the view
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
        >
          <span className="text-sm md:text-base font-medium">
            {showAll ? 'View less' : 'View more'} {/* Toggle the button text */}
          </span>
          <ChevronRight className={`w-4 h-4 transform ${showAll ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Booking Table */}
      <div>
        {/* Pass the fetched spot data and the showAll state to BookingTable */}
        <BookingTable spots={showAll ? data?.bookings.slice(0,10) : data?.bookings.slice(0, 5)} />

        <div className="md:hidden text-center mt-2 text-xs text-gray-500">Swipe left to see more columns →</div>
      </div>
    </div>
  );
}
