
import { LuClipboardList } from "react-icons/lu";      // Listing land
import { FaSearchLocation, FaUserCheck, FaCalendarCheck, FaTruck, FaHome } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";       // Earnings
import { MdOutlineMapsHomeWork } from "react-icons/md"; // Trusted Hosts
import WorkFlexBox from "./WorkFlexBox";


export default function HowItWorkSection({ role }) {
  
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 px-4">
      {/* 1. Listing / Searching */}
      <WorkFlexBox
        icon={role === 'landowner' ? <LuClipboardList /> : <FaSearchLocation />}
        heading={role === 'landowner' ? "List Your Land" : "Find Your Stay"}
        subheading={role === 'landowner'
          ? "Share details of your backyard or open space for RV parking."
          : "Browse and discover trusted, off-grid RV stays."}
      />

      {/* 2. Booking / Requests */}
      <WorkFlexBox
        icon={role === 'landowner' ? <FaUserCheck /> : <FaCalendarCheck />}
        heading={role === 'landowner' ? "Manage Bookings" : "Book with Ease"}
        subheading={role === 'landowner'
          ? "Track booking requests and communicate with travelers."
          : "Reserve your preferred spot quickly and securely."}
      />

      {/* 3. Hosting / Parking */}
      <WorkFlexBox
        icon={role === 'landowner' ? <FaHome /> : <FaTruck />}
        heading={role === 'landowner' ? "Welcome Travelers" : "Park Comfortably"}
        subheading={role === 'landowner'
          ? "Host RV travelers and provide them with safe, unique stays."
          : "Enjoy a secure and convenient parking experience."}
      />

      {/* 4. Earnings / Trust */}
      <WorkFlexBox
        icon={role === 'landowner' ? <GiReceiveMoney /> : <MdOutlineMapsHomeWork />}
        heading={role === 'landowner' ? "Earn with Ease" : "Trusted Hosts"}
        subheading={role === 'landowner'
          ? "Withdraw earnings anytime, directly to your bank account."
          : "Stay with verified landowners for peace of mind."}
      />
    </div>
  );
}
