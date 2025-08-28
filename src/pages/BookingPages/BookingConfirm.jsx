
import tick from "../../assets/icons/Tick.png";
import { Link } from 'react-router-dom';
import TealButton from "../../components/common/TealButton";
export default function ConfirmBooking() {
  return (
    <div className='container mx-auto py-10 px-4'>
        {/* Top */}
        <div className='flex flex-col items-center space-y-14'>
            <img src={tick} alt="" className='w-[100px] h-[100px] md:w-[180px] md:h-[180px]'/>
            <h1 className='font-medium text-4xl md:text-6xl'>Your Booking is Confirmed</h1>
            <p className='text-[22px] md:text-[32px] text-gray-600'>Thanks for choosing RVnBo. Your next adventure is ready</p>
        </div>

        

        {/* Button */}
        <div className='flex flex-col md:flex-row gap-4 mt-8'>
            <Link to="/spots">
            <TealButton text="View More Spot"></TealButton>
           
            </Link>

            <Link to="/">
             <TealButton text="Back My Home"></TealButton>
            </Link>
        </div>

       
    </div>
  )
}
