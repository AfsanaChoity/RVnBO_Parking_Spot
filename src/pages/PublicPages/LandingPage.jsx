
import Banner from '../../components/common/Banner'
import bgImg1 from '../../assets/images/BG_images/bg1.png'
import { useGetUserQuery } from '../../redux/api/authApi';
import { Link } from 'react-router-dom';
import MintButton from '../../components/common/MintButton';
import TealButton from '../../components/common/TealButton';
import { Box } from '@mui/material';
import SpotSearchForm from '../../components/Traveler/SpotSearchForm';
import { IoMdSearch } from 'react-icons/io';

export default function LandingPage() {

  const { data: userData, error, isLoading } = useGetUserQuery();
  const role = userData?.user?.role;
  // console.log(userData)

  let button2;
  if (!userData) {
    button2 = (
      <Link>
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
          heading={userData ? (role === "traveler" ? "Escape The Crowds" : "Share Your Land") : "Park. Explore. Repeat."}
          subheading={userData ? (role === "traveler" ? "Private land, untamed nature, and space to breathe." : "Welcome explorers. Build community. Earn effortlessly.") : "Hidden spots. Endless freedom. Off-grid your way."}
          button1={
            userData ?
              (role === "traveler" ?
                <Link>
                  <MintButton text="Browse Stays"></MintButton>
                </Link>
                :
                <Link>
                  <MintButton text="List Your Spot"></MintButton>
                </Link>)
              :
              <Link>
                <MintButton text="Find Your Spot"></MintButton>
              </Link>
          }

          button2={button2}

        />
      </div>


      {/* Form */}
      {role === 'traveler' && (
        <div>
          <Box className=" md:w-[70%] w-[96%] -mt-30 mx-auto  relative z-10">
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
                <SpotSearchForm></SpotSearchForm>
                <Link to=""> <TealButton text="Search" icon={<IoMdSearch />}></TealButton></Link>
              </div>

            </Box>

          </Box>
        </div>
      )
      }

    </div>
  )
}



{/* <WorkPageBanner
          backgroundImg={backgroundImg}
          heading={"How Does RVnBO Work?"}
          subheading={"Explore off-grid spots. Park with confidence. Sleep peacefully."}
          buttonText={"Start Exploring Today"}
          button2={
            <Link to="/welcome">
              <MintButton text="It's free to join" color="#468F9D" borderColor="#468F9D" />
            </Link>
          }
        /> */}