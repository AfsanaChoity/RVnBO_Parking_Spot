import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import GradientButton from '../common/GradientButton';


const Footer = () => {

  return (
    <footer className=" bg-[#468F9D]   pt-14 pb-10">
      <div className="mx-[8%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">

        {/* Column 1 */}
        <div className=' flex flex-col items-center lg:items-start'>
          <h1 className="text-xl font-bold  text-white mb-2">About</h1>
          <h2 className="text-lg font-semibold text-white mb-2">RVnBO</h2>
          <p className="text-sm text-white mb-2 text-center lg:text-start">
            Find unforgettable RV stays on private land. Boondock beneath the stars, skip the crowds, and rediscover the joy of the open road.
          </p>

        </div>

        {/* Column 2 */}
        <div className=''>
          <h1 className="text-xl font-bold text-white flex justify-center mb-4">Company</h1>
          <div className=" flex flex-col space-y-3 lg:space-y-6 text-white text-center text-sm">

            <Link to="/about-us">About Us</Link>
            <Link to="/spots">Features</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            {/* <p>Works</p> */}
            {/* <p>Hosting</p> */}

          </div>
        </div>

        {/* Column 3 */}
        <div className=''>
          <h1 className="text-xl font-bold text-white flex justify-center mb-4">Help</h1>
          <div className=" flex flex-col space-y-3 lg:space-y-6 text-white text-center text-sm">

            <Link to="/contact">Customer Support</Link>
            <Link to="/terms-conditions">Terms & Conditions</Link>
            {/* <Link to="/privacy-policy">Privacy Policy</Link> */}
            <Link to="/how-it-works">FAQ</Link>

          </div>
        </div>

        {/* Column 4 */}
        <div className=' '>
          <h1 className="text-xl font-bold text-white flex justify-center mb-4">Socials</h1>
          
            {/* Social Links */}
            <div className="flex  gap-4 text-white text-lg justify-center">
              <a href="https://www.facebook.com/" target='_blank'><FaFacebookF /></a>
              <a href="https://x.com/" target='_blank'><FaTwitter /></a>
              <a href="https://www.instagram.com/" target='_blank'><FaInstagram /></a>
              <a href="https://www.linkedin.com/" target='_blank'><FaLinkedinIn /></a>
            </div>

            {/* Button */}
            <div className=' mt-10 flex justify-center'>
              <Link to="/onboarding/role">
                <GradientButton text="Join Us"></GradientButton>
              </Link>
            </div>
        
        </div>
      </div>

    </footer>
  );
};

export default Footer;


