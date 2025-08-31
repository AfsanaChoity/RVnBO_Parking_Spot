import { FaStar } from "react-icons/fa"
import people1 from "../../assets/images//avaters/people1.png"
import people2 from "../../assets/images//avaters/people2.png"
import Heading from "../common/Heading"
import CenterParagraph from "../common/CenterParagraph"
import SubHeading from "../common/SubHeading"
import TealButton from "../common/TealButton"
import { Link } from "react-router-dom"

export default function SocialProofSection() {
    return (
        <div className="container mx-auto">
            <div className='text-center mb-20 flex flex-col gap-8'>

                <Heading text="Join The Revolution"></Heading>
                <SubHeading text="Adventurers and landowners redefining travel together"></SubHeading>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16  mb-10 lg:mb-20">

                {/* Card 1 */}
                <div className="lg:flex lg:gap-4">
                    <img src={people1} alt="Logo" className="lg:w-[50%] w-[100%] h-84  object-cover rounded" />

                    <div className="flex flex-col justify-between lg:w-[50%]">

                        <div className=''>
                            {/* Star Row */}
                            <div className="flex gap-1 text-yellow-500 mb-2 mt-4 md:mt-0">
                                <FaStar style={{ color: '#1E91B6' }} />
                                <FaStar style={{ color: '#1E91B6' }} />
                                <FaStar style={{ color: '#1E91B6' }} />
                                <FaStar style={{ color: '#1E91B6' }} />
                                <FaStar style={{ color: '#1E91B6' }} />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-medium text-gray-700">"I found a perfect boondocking spot I never would've discovered on any other app. No crowds, just nature—and a host who left fresh eggs at my site!"</h3>
                        </div>

                        {/* Paragraph */}
                        <h3 className="text-lg font-semibold">— Jenny Wilson, <br /> Full-Time RVer</h3>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="lg:flex lg:gap-4">
                    <img src={people2} alt="Logo" className="lg:w-[50%] w-[100%] h-84  object-cover rounded" />

                    <div className="lg:w-[50%] flex flex-col justify-between">
                        <div>
                            {/* Star Row */}
                            <div className="flex gap-1 mb-2 mt-4 md:mt-0" style={{ Color: '#1E91B6' }}>
                                <FaStar style={{ color: '#1E91B6' }} />
                                <FaStar style={{ color: '#1E91B6' }} />
                                <FaStar style={{ color: '#1E91B6' }} />
                                <FaStar style={{ color: '#1E91B6' }} />
                                <FaStar style={{ color: '#1E91B6' }} />
                            </div>
                            {/* Title */}
                            <h3 className="text-lg font-medium text-gray-700">"Found a great RV spot through this site—easy booking and a super friendly host. It feels way more personal than the big apps!"</h3>
                        </div>

                        {/* Paragraph */}
                        <h3 className="text-lg font-semibold"> — Devon Lane, <br /> Full-Time RVer</h3>
                    </div>
                </div>
            </div>

            {/* Button */}

            <div className="mb-20 px-[10%] md:px-[38%]">
                <Link to="/onboarding/role">
                    <TealButton text="Sign Up Free"></TealButton>
                </Link>
            </div>
        </div>
    )
}
