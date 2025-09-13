
import { LuClipboardList } from "react-icons/lu";      // Listing land
import { FaSearchLocation, FaUserCheck, FaCalendarCheck, FaTruck, FaHome } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";       // Earnings
import { MdOutlineMapsHomeWork } from "react-icons/md"; // Trusted Hosts
import WorkFlexBox from "./WorkFlexBox";


export default function HowItWorkSection({ role }) {
  
  
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 px-4">
      {/* 1. Listing / Searching */}
      <WorkFlexBox
        icon={role === 'landowner' ? <LuClipboardList /> : <FaSearchLocation />}
        heading={role === 'landowner' ? "List Your Land" : "Find Your Perfect Spot"}
        subheading={role === 'landowner'
          ? "Share details of your backyard or open space for RV parking."
          : "Browse unique, off-grid RV stays on private land across the country. Mountain views? Stargazing desert? It’s all here."}
      />

      {/* 2. Booking / Requests */}
      <WorkFlexBox
        icon={role === 'landowner' ? <FaUserCheck /> : <FaCalendarCheck />}
        heading={role === 'landowner' ? "Manage Bookings" : "Book in Seconds"}
        subheading={role === 'landowner'
          ? "Track booking requests and communicate with travelers."
          : "Pick your stay and reserve instantly. No crowded campgrounds, no hassle."}
      />

      {/* 3. Hosting / Parking */}
      <WorkFlexBox
        icon={role === 'landowner' ? <FaHome /> : <FaTruck />}
        heading={role === 'landowner' ? "Welcome Travelers" : "Park and Unplug"}
        subheading={role === 'landowner'
          ? "Host RV travelers and provide them with safe, unique stays."
          : "Roll in, set up, and enjoy nature. Many sites offer privacy, views, and peaceful surroundings."}
      />

      {/* 4. Earnings / Trust */}
      <WorkFlexBox
        icon={role === 'landowner' ? <GiReceiveMoney /> : <MdOutlineMapsHomeWork />}
        heading={role === 'landowner' ? "Earn with Ease" : "Stay with Good People"}
        subheading={role === 'landowner'
          ? "Withdraw earnings anytime, directly to your bank account."
          : "RVnBO hosts are real landowners—friendly folks who love the outdoors as much as you do."}
      />
    </div>
  );
}
