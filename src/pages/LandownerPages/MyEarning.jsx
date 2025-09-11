
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { BsBookmarkCheckFill } from "react-icons/bs";
import HeadingSmall from '../../components/common/HeadingSmall';
import DashboardFlexBox from "../../components/Shared/DashboardFlexBox";
import EarningTable from "../../components/Landowner/EarningTable";
import { useGetAllEarningQuery } from "../../redux/api/landownerApi";
import toast from "react-hot-toast";
import LoadingComponent from "../../components/common/LoadingComponent";
import { useEffect } from "react";


export default function MyEarning() {
    const { data, error, isLoading, isError } = useGetAllEarningQuery();

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "Failed to fetch earnings");
        }
    }, [isError, error]);



    if (isLoading) {
        return <div> <LoadingComponent /> </div>
    }

    
    return (
        <div>
            <div className='mb-10'>
                <HeadingSmall text="My Earnings"></HeadingSmall>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <DashboardFlexBox heading={`$${data?.totalEarnings || 0}`} subHeading="Total Earning" icon={<FaHandHoldingDollar />} color="#E7F0FA"></DashboardFlexBox>
                <DashboardFlexBox heading={`$${data?.thisMonthEarnings || 0}`} subHeading="This Month" icon={<FaCalendarAlt />} color="#FFF6E6"></DashboardFlexBox>
                <DashboardFlexBox heading={`${data?.totalBookings || 0}`} subHeading="Total Booking" icon={<BsBookmarkCheckFill />} color="#E6E6E6"></DashboardFlexBox>
            </div>

            <div className='mt-20'>
                 <div className="mb-6">
                    <h2 className="md:text-xl font-semibold text-gray-900">ALL Transactions</h2>
                 </div>
                <EarningTable></EarningTable>
            </div>
        </div>
    )
}
