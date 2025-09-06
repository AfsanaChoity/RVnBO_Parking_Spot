
import Banner from '../../components/common/Banner'
import bgImg1 from '../../assets/images/BG_images/bg6.png'
import { useGetUserQuery } from '../../redux/api/authApi';
import { Link } from 'react-router-dom';
import MintButton from '../../components/common/MintButton';
import TealButton from '../../components/common/TealButton';
import { Box } from '@mui/material';
import SpotSearchForm from '../../components/Traveler/SpotSearchForm';
import { IoMdSearch } from 'react-icons/io';
import ExploreStays from '../../components/Traveler/ExploreStays';
import WhyHost from '../../components/Landowner/WhyHost';
import WhyRVnBO from '../../components/Traveler/WhyRVnBO';
import HowItWorkSection from '../../components/Shared/HowItWorkSection';
import ExampleSpotsCard from '../../components/Landowner/ExampleSpotsCard';
import { useGetAllSpotsQuery } from '../../redux/api/userApi';
import LoadingComponent from '../../components/common/LoadingComponent';
import HostingSection from '../../components/Shared/HostingSection';
import SocialProofSection from '../../components/Shared/SocialProofSection';
import Heading from '../../components/common/Heading';
import { useGetSpotListQuery } from '../../redux/api/landownerApi';

export default function LandingPage() {

  const { data: userData, error: userError, isLoading: userLoading } = useGetUserQuery();
  const role = userData?.user?.role;

  const { data: spotData, error: spotError, isLoading: spotLoading } = useGetAllSpotsQuery();

  const{ data: hostLands, error: landError, isLoading: isLandLoading} = useGetSpotListQuery();
 



  let button2;
  if (!userData) {
    button2 = (
      <Link to="/onboarding/role">
        <TealButton text="Host Your Land"></TealButton>
      </Link>
    );
  }



  return (
    <div>

      {/* Banner */}
      <div>
        <Banner
          backgroundImg={bgImg1}
          title="RVnBO:"
          heading="Your Off-Grid Travel Adventure"
          heading2={userData ? (role === "traveler" ? "Escape The Crowds" : "Share Your Land") : "Park. Explore. Repeat."}
          subheading={userData ? (role === "traveler" ? "Private land, untamed nature, and space to breathe." : "Welcome explorers. Build community. Earn effortlessly.") : "Hidden spots. Endless freedom. Off-grid your way."}
          button1={
            userData ?
              (role === "traveler" ?
                <Link to="/spots">
                  <MintButton text="Browse Stays"></MintButton>
                </Link>
                :
                <Link to="/host/spots">
                  <MintButton text="List Your Spot"></MintButton>
                </Link>)
              :
              <Link to="/spots">
                <MintButton text="Find Your Spot"></MintButton>
              </Link>
          }

          button2={button2}

        />
      </div>


      {/* Form */}
      {/* {role !== 'landowner' && (
        <div>
          <Box className=" md:w-[70%] w-[96%] -mt-24 mx-auto  relative z-10">
            <Box
              className="  p-4  md:p-8 rounded-xl bg-[#fff] shadow-md text-center"
              component="form"
              sx={{
                display: {
                  sm: 'block',
                  md: 'flex',
                  lg: 'flex',
                },
                flexWrap: 'wrap',

                justifyContent: 'space-around',
              }}
              noValidate
              autoComplete="off"
            >


              <div className='flex flex-col gap-4'>
                <SpotSearchForm useLocalStorageDates={false}></SpotSearchForm>
                <Link to="/spots"> <TealButton text="Search" icon={<IoMdSearch />}></TealButton></Link>
              </div>

            </Box>

          </Box>
        </div>
      )
      } */}

      {/* /////////// */}
      {/* Section 2 */}


      {/* for traveler and public */}
      {
        role !== 'landowner' && (
          <div>
            <ExploreStays />
          </div>
        )

      }

      {/* for landowner */}
      {
        role === 'landowner' && (
          <div>
            <WhyHost />
          </div>
        )
      }


      {/* /////// */}
      {/* Section 3 */}

      {/* For public and traveler */}
      {
        role !== 'landowner' && (
          <div>
            <WhyRVnBO />
          </div>
        )
      }

      {/* section 4 */}
      <section>
        <div className='text-center mb-20'>
          <Heading text="How It Works"/>
          <HowItWorkSection role={role} />
        </div>
      </section>

      {/* Section 5 for landowner */}
      <section>
        

          {role === 'landowner' && (
          <div className='container mx-auto text-center mt-10 mb-20'>
          <div className='mb-16'>
            <Heading text="Gallery of Your Lands"/>
          </div>
            {isLandLoading ? (
              <LoadingComponent />
            ) : hostLands?.lands?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                {hostLands.lands.slice(0, 4).map((land) => (
                  <ExampleSpotsCard key={land._id} land={land} />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl md:text-4xl">You haven't started hosting yet...</h2>
              </div>
            )}
          </div>
        )}

      </section>

      {/* Section 6 */}
      <section className='mb-20'>
        <HostingSection role = {role}/>
      </section>

      {/* section 7 - social proof */}
        <section>
              <SocialProofSection/>
        </section>

    </div>
  )
}



