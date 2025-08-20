import React from 'react'
import { useGetUserQuery } from '../../redux/api/authApi';
import { useGetAllSpotsQuery } from '../../redux/api/userApi';
import SpotSearchForm from '../../components/Traveler/SpotSearchForm';
import { Link } from 'react-router-dom';
import TealButton from '../../components/common/TealButton';
import { IoMdSearch } from 'react-icons/io';
import FilterSidebar from '../../components/Traveler/FilterSidebar';

export default function DiscoverSpot() {
    const { data: userData } = useGetUserQuery();
    const role = userData?.user?.role;

    const { data: spotData, error: spotError, isLoading: spotLoading } = useGetAllSpotsQuery();

    return role !== "landowner" ? (
        <div className='mt-8'>
            <div className='flex justify-center'>
                <div className='flex flex-col gap-4 items-center md:border md:border-gray-300 py-8 md:rounded-2xl md:shadow-xl px-10'>
                    <div className='flex flex-col gap-4'>
                        <SpotSearchForm />
                        <Link to="">
                            <TealButton text="Search" icon={<IoMdSearch />} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className='mt-10 flex flex-col lg:flex-row lg:gap-[8%] '>
                <div className='lg:w-[20%]'>
                    <FilterSidebar></FilterSidebar>
                </div>
               {/* <div className='lg:w-[72%]'>
                 <ListingPage></ListingPage>
               </div> */}
            </div>
        </div>
    ) : (
        <div className=' mt-8'>
            <h1 className='text-center text-red-600 text-2xl font-semibold'>
                This page is not for Land Owners. Please logout or login as a traveler to view this page. Thank you!
            </h1>
        </div>
    );
}
