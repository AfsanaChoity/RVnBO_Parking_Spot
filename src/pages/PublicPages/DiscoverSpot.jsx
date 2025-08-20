import React, { useState } from 'react';
import { useGetUserQuery } from '../../redux/api/authApi';
import { useGetAllSpotsQuery } from '../../redux/api/userApi';
import SpotSearchForm from '../../components/Traveler/SpotSearchForm';
import { Link } from 'react-router-dom';
import TealButton from '../../components/common/TealButton';
import { IoMdSearch } from 'react-icons/io';
import FilterSidebar from '../../components/Traveler/FilterSidebar';
import SpotCard from '../../components/Traveler/SpotCard';
import { Box, Button, Typography } from '@mui/material';
import MintButton from '../../components/common/MintButton';
import LoadingComponent from '../../components/common/LoadingComponent';

export default function DiscoverSpot() {
    const { data: userData } = useGetUserQuery();
    const role = userData?.user?.role;

    const { data: spotData, error: spotError, isLoading: spotLoading } = useGetAllSpotsQuery();
    const spots = spotData?.lands || [];

    const [sortByRating, setSortByRating] = useState(false);

    const [visibleCount, setVisibleCount] = useState(4);

    if (spotLoading) {
        return <div className="text-center mt-10"><LoadingComponent /></div>;
    }

    if (spotError) {
        return <h2 className="text-center mt-10 text-red-600">Failed to load spots</h2>;
    }

    // Sort spots by rating if sortByRating is true
    const displayedSpots = [...spots].sort((a, b) => {
        if (sortByRating) {
            return (b.averageRating || 0) - (a.averageRating || 0);
        }
        return 0; // keep original order
    });

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 4); // show 4 more spots each time
    };



    return role !== "landowner" ? (
        <div className='mt-8'>
            <div className='flex justify-center'>
                <div className='flex flex-col gap-4 items-center md:border md:border-gray-300 py-8 md:rounded-2xl md:shadow-xl px-10'>
                    <div className='flex flex-col gap-4'>
                        <SpotSearchForm />
                        <Link to="">
                            <TealButton text="Search By Location" icon={<IoMdSearch />} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className='mt-10 flex flex-col lg:flex-row lg:gap-[8%] ml-4'>
                <div className='lg:w-[20%]'>
                    <FilterSidebar />
                </div>

                {/* spot list */}
                <div className='lg:w-[72%]'>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: { xs: "column", md: "row" },
                            mb: 2,
                            alignItems: "center"
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ color: "#1b2c24", fontWeight: 600 }}>
                            Showing <span style={{ color: "#2db6c4" }}>{Math.min(visibleCount, displayedSpots.length)}</span> of{" "}
                            <span style={{ color: "#ef4e5d" }}>{displayedSpots.length} places</span>
                        </Typography>

                        <Button
                            variant="text"
                            size="small"
                            sx={{ color: "#37979C", textTransform: "none", fontWeight: 500, fontSize: 16 }}
                            endIcon={<span style={{ fontSize: 19 }}>▼</span>}
                            onClick={() => setSortByRating(!sortByRating)}
                        >
                            Sort by Rating
                        </Button>
                    </Box>

                    <div className="grid grid-cols-1 gap-6">
                        {displayedSpots.slice(0, visibleCount).map((spot) => (
                            <SpotCard key={spot._id} spot={spot} />
                        ))}
                    </div>

                    {/* Show more Button */}
                    {visibleCount < spots.length && (
                        <div className='mt-10 mb-20 text-center'>
                            <MintButton text="Show More" onClick={handleShowMore} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div className='my-28'>
            <h1 className='text-center text-red-600 text-2xl font-semibold'>
                This page is not for Land Owners. Please logout or login as a traveler to view this page. Thank you!
            </h1>
        </div>
    );
}
