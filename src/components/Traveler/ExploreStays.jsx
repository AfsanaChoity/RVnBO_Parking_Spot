import { Link } from 'react-router-dom'
import pic1 from '../../assets/images/BG_images/img1.jpg'
import pic2 from '../../assets/images/BG_images/img2.jpg'
import pic3 from '../../assets/images/BG_images/img3.jpg'
import pic4 from '../../assets/images/BG_images/img4.jpg'
import pic5 from '../../assets/images/BG_images/img5.jpg'
import pic6 from '../../assets/images/BG_images/img6.jpg'

export default function ExploreStays() {
  return (
    <div className=''>
        <div className="  mt-20 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div className="flex flex-col ">
              {/* Image + Text Block Combined */}
              <div className="flex flex-col rounded-sm overflow-hidden h-full">
                {/* Image Grid Block - no padding */}
                <div className=" flex h-70 lg:h-100">
                  {/* Left 2 images - 25% width, full height, no padding */}
                  <div className="flex flex-col justify-between w-1/4 gap-2">
                    <img src={pic1} alt="Left 1" className="w-full h-1/2 object-cover" />
                    <img src={pic2} alt="Left 2" className="w-full h-1/2 object-cover" />
                  </div>
                  {/* Center image - 50% width, full height */}
                  <div className="w-1/2 px-2">
                    <img src={pic3} alt="Center" className="w-full h-full object-cover" />
                  </div>
                  {/* Right 2 images - 25% width, full height, no padding */}
                  <div className="flex flex-col gap-2 justify-between w-1/4">
                    <img src={pic4} alt="Right 1" className="w-full h-1/2 object-cover" />
                    <img src={pic5} alt="Right 2" className="w-full h-1/2 object-cover" />
                  </div>
                </div>
                {/* Text + Button */}
                <div className=" px-6 flex flex-col justify-between gap-2 rounded-b-lg h-40" style={{ backgroundColor: '#468F9D' }}>
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-white mt-4">Find Your Perfect Stay</h2>
                    <p className="text-white font-2xl ">The Road less traveled has a spot waiting for you. </p>
                  </div>
                  <Link to="/discover-spots" className=" text-white px-4 py-2 rounded-full w-fit self-end mb-2" style={{ backgroundColor: '#8AC197' }}>Explore More</Link>
                </div>
              </div>
            </div>



            {/* Right Section */}
            <div className=" ">
              {/* Image + Text Block Combined */}
              <div className=" rounded-sm overflow-hidden">
                {/* Single Image */}
                <div className=' h-70 lg:h-100'>
                  <img src={pic6} alt="Featured" className=" w-full h-full object-cover rounded-t-lg" />
                </div>

                {/* Text + Button */}
                <div className="bg-[#468F9D] px-6  flex flex-col justify-between  rounded-b-lg h-40" >
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-white mt-4">Travel Clean</h2>
                    <p className="text-white font-2xl ">Off-grid adventures that leave nothing behind but memories.</p>  
                  </div>
                  <Link to="/how-it-works" className=" text-white px-4 py-2 rounded-full w-fit self-end mb-2" style={{ backgroundColor: '#8AC197' }}>Learn How</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
