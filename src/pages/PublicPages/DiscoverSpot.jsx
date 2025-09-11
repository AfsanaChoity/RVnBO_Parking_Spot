

import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useGetUserQuery } from '../../redux/api/authApi';
import { useGetAllSpotsQuery, useSearchSpotsQuery } from '../../redux/api/userApi';
import SpotSearchForm from '../../components/Traveler/SpotSearchForm';
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

  // search + filter states
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 500,
    amenities: [],
    site_types: [],
    rv_type: [],
    site_length: '',   // '35 ft'
    max_slide_label: '', // '3+ Slides' (UI only)
    minRating: 0,
  });

  const [checkIn, setCheckIn] = useState(dayjs());
  const [checkOut, setCheckOut] = useState(dayjs());
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [sortByRating, setSortByRating] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  // --- helpers to map UI -> backend values ---
  // const mapAmenity = (a) => (a === 'Electricity' ? 'Electricity' : a === 'Wi-Fi' ? 'Wifi' : a);

  const mappedQueryArgs = useMemo(() => {
    // convert "3+ Slides" | "2 Slides" | "1 Slide" | "0 Slide" -> number (backend takes max)
    // let maxSlide = undefined;
    // const label = filters.max_slide_label;
    // if (label) {
    //   if (label.startsWith('3+')) maxSlide = 20;
    //   else {
    //     const n = parseInt(label, 10);
    //     if (!Number.isNaN(n)) maxSlide = n;
    //   }
    // }

    

    return {
      location: location || undefined,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minRating: filters.minRating,
      site_types: filters.site_types,
      rv_type: filters.rv_type,
      // amenities: filters.amenities.map(mapAmenity),
      amenities: filters.amenities,
      site_length: filters.site_length || undefined,
      // max_slide: maxSlide,
      max_slide: filters.max_slide_label,
    };
  }, [location, filters]);

  // initial: fetch all spots list (unchanged)
  const { data: allSpotsData, isLoading: allSpotsLoading, error: allSpotsError } = useGetAllSpotsQuery();

  // filtered search: only when searchTriggered true
  const {
    data: filteredData,
    isLoading: filteredLoading,
    error: filteredError,
  } = useSearchSpotsQuery(mappedQueryArgs, { skip: !searchTriggered });

  

  const spots = searchTriggered ? (filteredData?.data || []) : (allSpotsData?.lands || []);

  // handlers
  const handleShowMore = () => setVisibleCount((prev) => prev + 5);

  const handleSearch = () => {
    if (!location.trim()) {
      setErrorMsg('Please provide a location to search.');
      setSearchTriggered(false);
      return;
    }
    setErrorMsg('');
    setSearchTriggered(true); // this will trigger useSearchSpotsQuery with current filters
  };

  const handleApplyFilters = () => {
    
    setSearchTriggered(true);
  };

  const handleClearFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: null,
      amenities: [],
      site_types: [],
      rv_type: [],
      site_length: '',
      max_slide_label: '',
      minRating: 0,
    });
    
    setSearchTriggered(false);
  };

  // loading / error
  if (allSpotsLoading || filteredLoading) {
    return <div className="text-center mt-10"><LoadingComponent /></div>;
  }

  
  if (allSpotsError) {
    
    return <h2 className="text-center mt-10 text-red-600 text-3xl font-semibold">{allSpotsError?.data?.message || "No Spot Found"}</h2>;
  }


  if (filteredError) {
    
    return <h2 className="text-center mt-10 text-red-600 text-3xl font-semibold">{filteredError?.data?.message || "No Spot Found"}</h2>;
  }

  const displayedSpots = [...spots].sort((a, b) =>
    sortByRating ? (b.averageRating || 0) - (a.averageRating || 0) : 0
  );

  return role !== "landowner" ? (
    <div className='mt-8 container mx-auto'>
      {/* Search Box */}
      <div className='flex justify-center'>
        <div className='flex flex-col gap-4 items-center md:border md:border-gray-300 py-8 md:rounded-2xl md:shadow-xl px-10'>
          <SpotSearchForm
            location={location}
            setLocation={setLocation}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            useLocalStorageDates={true}
          />
          <div>
            <TealButton text="Search" icon={<IoMdSearch />} onClick={handleSearch} />
          </div>
          {errorMsg && <Typography variant="body2" color="error" sx={{ mt: 1 }}>{errorMsg}</Typography>}
        </div>
      </div>

      {/* Results */}
      <div className='mt-10 flex flex-col lg:flex-row lg:gap-[8%] ml-4'>
        {/* Sidebar */}
        <div className='lg:w-[20%]'>
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        </div>

        {/* Spot List */}
        <div className='lg:w-[72%]'>
          <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, mb: 2, alignItems: "center" }}>
            <Typography variant="subtitle1" sx={{ color: "#1b2c24", fontWeight: 600 }}>
              Showing <span style={{ color: "#2db6c4" }}>{Math.min(visibleCount, displayedSpots.length)}</span> of{" "}
              <span style={{ color: "#ef4e5d" }}>{displayedSpots.length} places</span>
            </Typography>

            <Button
              variant="text" size="small"
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

          {visibleCount < displayedSpots.length && (
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
