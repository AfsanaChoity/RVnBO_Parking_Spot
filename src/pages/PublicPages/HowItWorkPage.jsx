import Banner from "../../components/common/Banner";
import bgImg1 from "../../assets/images//BG_images/bg3.jpg"
import bgImg2 from "../../assets/images//BG_images/bg2.jpg"
import { useGetUserQuery } from "../../redux/api/authApi";
import { Link } from "react-router-dom";
import MintButton from "../../components/common/MintButton";
import TealButton from "../../components/common/TealButton";
import Heading from "../../components/common/Heading";
import FAQs from "../../components/Shared/FAQs";
import HowItWorkSection from "../../components/Shared/HowItWorkSection";


export default function HowItWorkPage() {

    const { data: userData, error: userError, isLoading: userLoading } = useGetUserQuery();
    const role = userData?.user?.role;

    return (
        <div className=' mb-20'>

            {/* Banner */}
            <div>
                <Banner
                    backgroundImg={bgImg1}
                    heading="How Does RVnBO Work?"
                    subheading={
                        role === "traveler"
                            ? "Explore unique off-grid spots. Park with confidence. Sleep peacefully on your journey."
                            : role === "landowner"
                                ? "Share your land with travelers. Earn extra income while helping adventurers find safe stays."
                                : "Join RVnBO today — explore or host off-grid spots for free!"
                    }
                    button1={
                        role === "traveler" ? (
                            <Link to="/spots">
                                <MintButton text="Start Exploring" />
                            </Link>
                        ) : role === "landowner" ? (
                            <Link to="/host/spots">
                                <MintButton text="Start Hosting Now" />
                            </Link>
                        ) : (
                            <Link to="/onboarding/role">
                                <MintButton text="It's Free To Join" />
                            </Link>
                        )
                    }
                />
            </div>


            {/* How it Works component */}

            <section>
                <div className='text-center my-20'>
                    <Heading text="How It Works" />
                    <HowItWorkSection role={role} />
                </div>
            </section>

            {/* FAQs */}
            <div className='text-center my-10 lg:my-20'>

                <Heading text="Frequently Asked Questions"></Heading>
                <div className='mx-4 lg:mx-20'>
                    <FAQs role={role}></FAQs>
                </div>
            </div>

            {/* Find RV spot now section */}
            {role !== 'landowner' &&
                <div >
                    <Banner
                        backgroundImg={bgImg2}
                        heading="One Click to Adventure"
                        subheading="Discover unique RV spots, plan your stay, and enjoy nature like never before — all with just a few clicks."
                        button1={
                            <Link to="/spots"> <TealButton text="Find RV Spot Now"></TealButton></Link>
                        }
                    >

                    </Banner>
                </div>
            }



        </div>
    )
}
