import road from "../../assets/images/BG_images/road.png"
import { LiaCheckSolid } from "react-icons/lia";
import Heading from "../common/Heading";
import SubHeading from "../common/SubHeading";

export default function WhyRVnBO() {
    return (
        <div >


            <div className='text-center mb-16 space-y-8'>
                <Heading text="Why RVnBo?"/>
                <SubHeading text="We’re building a movement of boondockers, landowners, and explorers. Whether you're new to RVing or a seasoned nomad, you'll find your kind of freedom here"/>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 mx-10 md:mx-20 gap-4 text-center">
                <h2 className='flex text-xl md:text-2xl'><LiaCheckSolid className='text-2xl md:text-4xl' />Verified landowners</h2>
                <h2 className='flex text-xl md:text-2xl'><LiaCheckSolid className='text-2xl md:text-4xl' />Stay off-grid or with lice</h2>
                <h2 className='flex text-xl md:text-2xl'><LiaCheckSolid className='text-2xl md:text-4xl' />Secure GPS navigation</h2>
                <h2 className='flex text-xl md:text-2xl'><LiaCheckSolid className='text-2xl md:text-4xl' />Affordable ad with hookups</h2>


            </div>

            {/* image */}
            <div className="flex justify-center items-center mt-10 md:mt-20 mb-20">
                <img src={road} alt="road" className="" />
            </div>
        </div>
    )
}
