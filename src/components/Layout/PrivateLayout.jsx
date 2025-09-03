import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ScrollToTop from "../common/ScrollToTop";


export default function PrivateLayout() {
  return (
    
    <div className=''>

      {/* Scroll to top when route changes */}
      <ScrollToTop />

      {/* Navbar at the top */}
      <div className=''>
        <Navbar></Navbar>
      </div>
      <div className='flex'>
        {/* Sidebar hidden on small devices */}
        <div className='hidden md:block md:w-[26%] '>
          <Sidebar></Sidebar>
        </div>
        {/* Main content area */}
        <div className=' p-8 w-full'>
          <Outlet />
        </div>


      </div>
      
    </div>
  )
}
