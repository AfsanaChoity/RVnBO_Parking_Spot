import { Link } from 'react-router-dom'
import bgImg from '../../assets/images//BG_images/img3.jpg'
import MintButton from '../common/MintButton'
export default function HostingSection({ role }) {
  return (
    <>
       <div
        className=" px-4 h-[700px] bg-cover bg-center flex items-end justify-start "
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      >
        {/* Styled Button */}
        <div
          className="md:ml-20 bg-[#468F9D] flex flex-col items-start justify-center gap-[10px] text-white text-lg font-semibold w-[513px]  rounded-3xl p-6 md:p-10 mb-10"

        >
          <h2 className='text-left text-xl'> Join a Movement. Welcome Fellow Travelers.</h2>
          <p className="text-sm font-medium text-gray-200 text-left">Help travelers find peace—and give your land a purpose.
            Hosting is simple, meaningful, and 100% yours to control.
            Start now, stay as involved as you like.</p>

          {/* Small Button Inside */}
         <div className='mt-8'>
           <Link to={role === 'landowner' ? "/mylisting": "/onboarding/role"}> <MintButton text="Start Hosting Free"></MintButton></Link>
         </div>
        </div>
      </div>
    </>
  )
}
