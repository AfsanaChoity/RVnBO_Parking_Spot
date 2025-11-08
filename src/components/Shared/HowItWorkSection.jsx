
import { LuClipboardList } from "react-icons/lu";      // Listing land
import { FaSearchLocation, FaUserCheck, FaCalendarCheck, FaTruck, FaHome } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";       // Earnings
import { MdOutlineMapsHomeWork } from "react-icons/md"; // Trusted Hosts
import WorkFlexBox from "./WorkFlexBox";


export default function HowItWorkSection({ role }) {
  
  
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10 px-4">
      {/* 1. Listing / Searching */}
      {/* <WorkFlexBox
        icon={role === 'landowner' ? <LuClipboardList /> : <FaSearchLocation />}
        heading={role === 'landowner' ? "List Your Land" : "Find Your Perfect Spot"}
        subheading={role === 'landowner'
          ? "Share details of your backyard or open space for RV parking."
          : "Browse unique, off-grid RV stays on private land across the country. Mountain views? Stargazing desert? It’s all here."}
      /> */}
      <WorkFlexBox
        icon={role === 'landowner' ? <LuClipboardList /> : <FaCalendarCheck />}
        heading={role === 'landowner' ? "Create Listing" : "Subscribe"}
        subheading={role === 'landowner'
          ? "List your land for RV stays. Set availability, pricing, and rules in minutes."
          : "Get curated RV stays, new listings, and deals delivered to your inbox."}
      />

      {/* 2. Booking / Requests */}
      {/* <WorkFlexBox
        icon={role === 'landowner' ? <FaUserCheck /> : <FaCalendarCheck />}
        heading={role === 'landowner' ? "Manage Bookings" : "Book in Seconds"}
        subheading={role === 'landowner'
          ? "Track booking requests and communicate with travelers."
          : "Pick your stay and reserve instantly. No crowded campgrounds, no hassle."}
      /> */}

      <WorkFlexBox
        icon={role === 'landowner' ? <FaUserCheck /> :  <FaSearchLocation />}
        heading={role === 'landowner' ? "Approve Requests" : "Discover Spots"}
        subheading={role === 'landowner'
          ? "Manage and approve booking requests from travelers."
          : "Explore handpicked, unique locations for your next getaway."}
      />

      {/* 3. Hosting / Parking */}
      {/* <WorkFlexBox
        icon={role === 'landowner' ? <FaHome /> : <FaTruck />}
        heading={role === 'landowner' ? "Welcome Travelers" : "Park and Unplug"}
        subheading={role === 'landowner'
          ? "Host RV travelers and provide them with safe, unique stays."
          : "Roll in, set up, and enjoy nature. Many sites offer privacy, views, and peaceful surroundings."}
      /> */}

      {/* 4. Earnings / Trust */}
      <WorkFlexBox
        icon={role === 'landowner' ? <GiReceiveMoney /> : <MdOutlineMapsHomeWork />}
        heading={role === 'landowner' ? "Get Paid Directly" : "Contact Host"}
        subheading={role === 'landowner'
          ? "Easily withdraw your earnings to your bank account, anytime."
          : "Reach out to hosts who are passionate about sharing their unique spaces."}
      />
    </div>
  );
}
