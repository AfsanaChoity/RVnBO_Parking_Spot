import React, { useState } from 'react';
import HeadingSmall from '../../components/common/HeadingSmall';
import { useGetAllSavedSpotsQuery } from '../../redux/api/travelerApi';
import LoadingComponent from '../../components/common/LoadingComponent';
import Heading from '../../components/common/Heading';
import SpotCard from '../../components/Traveler/SpotCard';
import MintButton from '../../components/common/MintButton';
import { Box, Typography } from '@mui/material';

export default function SavedSpots() {
  const { data: savedSpots, error, isLoading } = useGetAllSavedSpotsQuery();
  const [visibleCount, setVisibleCount] = useState(3);

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <LoadingComponent />
      </div>
    );
  }
  

  if (error) {
    return (
      <div className="text-center mt-10">
        <Heading text="Something went wrong while fetching saved spots." />
      </div>
    );
  }

  const displaySavedSpots = savedSpots?.savedLands || [];
  

  if (displaySavedSpots.length === 0) {
    return (
      <div className="flex justify-center items-center mt-10">
        <Heading text="No saved spot found" />
      </div>
    );
  }

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="px-4 md:px-8 mt-6">
      {/* Heading */}
      <div className="mb-6">
        <HeadingSmall text="Saved Spots" />
      </div>

      {/* Spot Cards */}
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            mb: 2,
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: "#1b2c24", fontWeight: 600 }}
          >
            Showing{" "}
            <span style={{ color: "#2db6c4" }}>
              {Math.min(visibleCount, displaySavedSpots.length)}
            </span>{" "}
            of{" "}
            <span style={{ color: "#ef4e5d" }}>
              {displaySavedSpots.length} places
            </span>
          </Typography>
        </Box>

        <div className="grid grid-cols-1 gap-6">
          {displaySavedSpots.slice(0, visibleCount).map((spot) => (
            <SpotCard key={spot._id} spot={spot} />
          ))}
        </div>

        {visibleCount < displaySavedSpots.length && (
          <div className="mt-10 mb-20 text-center">
            <MintButton text="Show More" onClick={handleShowMore} />
          </div>
        )}
      </div>
    </div>
  );
}
