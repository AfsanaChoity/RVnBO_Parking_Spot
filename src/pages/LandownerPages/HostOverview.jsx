import { FaSackDollar } from 'react-icons/fa6'
import { CiCircleList, CiSettings } from 'react-icons/ci'
import { TbBrandBooking } from 'react-icons/tb'
import { BsBookmarkCheckFill } from "react-icons/bs";
import HeadingSmall from '../../components/common/HeadingSmall'
import DashboardFlexBox from '../../components/Shared/DashboardFlexBox';
import SpotBookingTable from '../../components/Landowner/SpotBookingTable';
import { useGetOverviewDataQuery } from '../../redux/api/landownerApi';
import { useGetUserQuery } from '../../redux/api/authApi';
import LoadingComponent from '../../components/common/LoadingComponent';
import { useState } from 'react';
import { ChevronRight } from '@mui/icons-material';



export default function HostOverview() {
  const [showAll, setShowAll] = useState(false);
  const { data: overviewData, error: dataError, isLoading: isDataLoading } = useGetOverviewDataQuery();
  const { data: userData, error: userError, isLoading: userIsloading } = useGetUserQuery();

  const handleViewToggleClick = () => {
    setShowAll(!showAll);
  };

  if (isDataLoading) {
    return <div><LoadingComponent /></div>;
  }


  if (dataError) {
    return <div>Error fetching booking spots.</div>;
  }

  if (userIsloading) {
    return <div><LoadingComponent /></div>;
  }

  if (userError) {
    return <div>{userError}</div>
  }


  return (
    <div>
      <div>
        <HeadingSmall text={`Hello, ${userData?.user?.name || 'Host'}`}></HeadingSmall>
      </div>

      <div className='mt-4 mb-10'>

        <p className='text-gray-600'>Here’s a quick look at your RVnBO hosting activity</p>
      </div>


      {/* box */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <DashboardFlexBox heading={`${overviewData?.totalLands}`} subHeading="Total Spot" icon={<CiCircleList />} color="#E7F0FA"></DashboardFlexBox>
        <DashboardFlexBox heading={`${overviewData?.totalBookings}`} subHeading="Total Booking " icon={<BsBookmarkCheckFill />} color="#FFF6E6"></DashboardFlexBox>
        <DashboardFlexBox heading={`$${overviewData?.totalEarnings}`} subHeading="Total Earning " icon={<FaSackDollar />} color="#E6E6E6"></DashboardFlexBox>
      </div>

      {/* Table */}


      <div className='mt-10'>
        <div className="flex items-center justify-between mb-6 mt-10">
          <h2 className="md:text-xl font-semibold text-gray-900">ALL Bookings</h2>
          {
            (overviewData?.bookingDetails.length > 7) &&
            <button
              onClick={handleViewToggleClick} // Toggle the view
              className="cursor-pointer flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
            >
              <span className="text-sm md:text-base font-medium">
                {showAll ? 'View less' : 'View more'} {/* Toggle the button text */}
              </span>
              <ChevronRight className={`w-4 h-4 transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          }
        </div>

        {/* Spot Booking Table */}
        <div>

          <SpotBookingTable bookingDetails={showAll ? overviewData?.bookingDetails : overviewData?.bookingDetails.slice(0, 7)}></SpotBookingTable>
        </div>
      </div>
    </div>
  )
}
