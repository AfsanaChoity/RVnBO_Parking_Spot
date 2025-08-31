import { MapPin, Droplets, Flame, Zap, DollarSign, Wifi } from "lucide-react"
import { useGetUserQuery } from "../../redux/api/authApi"
import { useGetSpotDetailsQuery } from "../../redux/api/privateApi";
import { Divider, IconButton } from '@mui/material';
import { IoLocation } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import TealButton from "../../components/common/TealButton";
import MintButton from "../../components/common/MintButton";
import Heading from "../../components/common/Heading";
import LoadingComponent from "../../components/common/LoadingComponent";
import ImageGallery from "../../components/common/ImageGallary";
import star from '../../assets/icons/star.png'
import GoogleMap from "../../components/Shared/GoogleMap";
import HeadingSmall from "../../components/common/HeadingSmall";
import GuestReview from "../../components/Shared/GuestReview";

function getRatingText(rating) {
    if (!rating || rating === 0) return "No Rating";
    if (rating < 2) return "Poor";
    if (rating < 3) return "Fair";
    if (rating < 4) return "Good";
    if (rating < 4.5) return "Very Good";
    return "Excellent";
}

const AMENITY_ICONS = {
    "Wi-Fi": <Wifi className="w-6 h-6 text-blue-500" />,
    Water: <Droplets className="w-6 h-6 text-blue-500" />,
    Electricity: <Zap className="w-6 h-6 text-yellow-500" />,
    "Sewage Hookups": <Droplets className="w-6 h-6 text-gray-500" />,
    Firepit: <Flame className="w-6 h-6 text-orange-500" />,
};

export default function SpotDetails() {
    const { id: spotId } = useParams();
    const { data: userData, error: userError, isLoading: isUserLoading } = useGetUserQuery();
    const { data: spotDetails, error: spotError, isLoading: isSpotLoading } = useGetSpotDetailsQuery(spotId);

    console.log(spotDetails?.land?.owner?._id)

    if (userError) {
        return <div className="my-10 text-center"> <Heading text="No User Found"></Heading></div>
    }

    if (spotError) {
        return <div className="my-10 text-center"> <Heading text={spotError?.data?.message || "Error Loading Details"}></Heading></div>
    }

    if (isUserLoading) {
        return <div><LoadingComponent /></div>
    }

    if (isSpotLoading) {
        return <div><LoadingComponent /></div>
    }

    const role = userData?.user?.role;


    return (
        <div className='container mx-auto px-4 lg:px-10'>
            {/* Top section */}
            <div>
                <div className='pt-8 pb-8'>
                    {/* ///////// */}
                    <div className='mt-4 flex flex-col md:flex-row gap-10 md:justify-between'>
                        {/* text */}
                        <div className=' flex flex-col space-y-2'>
                            <h1 className='text-[#112211] font-semibold text-[24px]'>{spotDetails?.land?.spot}</h1>
                            <div className='flex items-center gap-1 '>
                                <IoLocation />
                                <p>{spotDetails?.land?.location}</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <div className='h-[32px] w-[40px] border border-gray-500 rounded flex justify-center items-center'><p>{spotDetails?.land?.averageRating}</p></div>
                                <p ><span className='font-semibold'>{getRatingText(spotDetails?.land?.averageRating)}</span> {spotDetails?.land?.totalRatings} reviews</p>

                            </div>

                        </div>

                        {/* Price & button */}
                        <div className='flex flex-col space-y-2 items-end'>
                            <p className='font-bold text-[32px] text-[#468F9D]'>${spotDetails?.land?.price} <span className=' text-[20px]'>/night</span></p>

                            <div className='flex'>

                                {
                                    (role === 'traveler') &&
                                    <Link to="/booking-checkout" state={{ spotDetails }}>
                                        <MintButton text="Book Now"></MintButton>
                                    </Link>
                                }

                            </div>
                        </div>

                    </div>




                    {/* Image Gallary*/}

                    <div className="my-10">
                        <ImageGallery images={spotDetails?.land?.image} />
                    </div>

                    {/* devider */}
                    <div className='mt-10'>
                        <Divider />
                    </div>

                    {/* Overview */}
                    <section>
                        <div className="mt-10">
                            {/* Overview Heading */}
                            <div className='flex flex-col gap-4 md:flex-row md:justify-between mb-6'>
                                <h2 className="text-[#112211] font-semibold text-3xl">Overview</h2>
                                <div>
                                    {role === 'traveler' && (
                                        <Link to="/inbox"
                                            state={{ ownerId: spotDetails?.land?.owner?._id }}>
                                            <TealButton text="Chat with Owner" />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Description Text */}
                            <div className="space-y-4 mb-8 text-[#112211] font-medium leading-relaxed">
                                <p>{spotDetails?.land?.description}</p>
                            </div>

                            {/* Rating and Amenities Cards */}
                            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                                {/* Rating Card */}
                                <div className="bg-[#468F9D] text-white rounded-lg p-6 w-[166px] h-[145px]">
                                    <div className="text-3xl font-bold mb-2">{spotDetails?.land?.averageRating}</div>
                                    <div className="text-sm">
                                        <div className="font-medium">{getRatingText(spotDetails?.land?.averageRating)}</div>
                                        <div className="opacity-90">{spotDetails?.land?.totalRatings} reviews</div>
                                    </div>
                                </div>

                                {/* Near Park Card */}
                                <div className="w-[166px] h-[145px] border border-gray-300 rounded-lg p-6  ">
                                    <img src={star} alt="" className="mb-10" />
                                    <p className="font-medium text-gray-700">Near park</p>

                                </div>


                                {/* Near Nightlife Card */}
                                <div className="w-[166px] h-[145px] border border-gray-300 rounded-lg p-6  ">
                                    <img src={star} alt="" className="mb-10" />
                                    <p className="font-medium text-gray-700">Near nightlife</p>

                                </div>
                            </div>




                        </div>
                    </section>

                    {/* Amenities */}
                    <section className="mt-10">
                        <div className="mb-6">
                            <HeadingSmall text="Amenities" />
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 mb-4">
                            {
                                (spotDetails?.land?.amenities?.length === 0) ? (<p>No Amenities</p>) :
                                    spotDetails?.land?.amenities?.map((amenity, i) => (
                                        <div key={i} className="flex items-center gap-1 ">
                                            {AMENITY_ICONS[amenity]}
                                            <span className="text-xl text-gray-700 ">{amenity}</span>
                                        </div>
                                    ))
                            }

                        </div>

                        {/* RV types */}
                        <div className="mt-10">
                            <HeadingSmall text="RV Types Allowed" />
                            <div className="flex flex-wrap gap-4 mt-4">
                                {spotDetails?.land?.rv_type?.map((rvType, index) => (
                                    <div key={index} className="px-4 py-2 border border-teal-800 rounded-full text-teal-900 text-sm">
                                        {rvType}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Site type */}
                        <div>
                            <div className="mt-10">
                                <HeadingSmall text="Site Type" />
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {spotDetails?.land?.site_types?.map((siteType, index) => (
                                        <div key={index} className="px-4 py-2 border border-teal-800 rounded-full text-teal-900 text-sm">
                                            {siteType}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Bottom Border */}
                    <div className='mt-10 mb-10'>
                        <hr className="mt-10 mb-10 " />
                        <Divider />
                    </div>


                    {/* Map */}
                    <section>
                        <div className="mb-6">
                            <HeadingSmall text="Find On Map" />
                        </div>
                        <div>
                            <GoogleMap lat={spotDetails?.land?.gps_coordinates?.latitude} lng={spotDetails?.land?.gps_coordinates?.longitude} text={spotDetails?.land?.spot}></GoogleMap>
                        </div>
                    </section>
                </div>
            </div>


            {/* Review */}
            <section>
                <div className="mt-10 mb-10">
                    <GuestReview
                        role={role}
                        ratingsAndReviews={spotDetails?.land?.ratingsAndReviews || []}
                        averageRating={spotDetails?.land?.averageRating || 0}
                        totalRatings={spotDetails?.land?.totalRatings || 0}
                        landId={spotDetails?.land?._id}
                    />
                </div>
            </section>

        </div>
    )
}
