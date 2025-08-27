
import { useEffect, useState } from "react";
import {
    Paper,
    Box,
    CardMedia,
    Chip,
    Typography,
    IconButton,
    Stack,
    Divider
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { useGetAllSavedSpotsQuery, useSaveSpotMutation, useUnsaveSpotMutation } from "../../redux/api/travelerApi";
import { useGetUserQuery } from "../../redux/api/authApi";
import toast from "react-hot-toast";


function getRatingText(rating) {
    if (!rating || rating === 0) return "No Rating";
    if (rating < 2) return "Poor";
    if (rating < 3) return "Fair";
    if (rating < 4) return "Good";
    if (rating < 4.5) return "Very Good";
    return "Excellent";
}

const SpotCard = ({ spot }) => {
    const {
        _id,
        location,
        image,
        spot: spotName,
        amenities,
        isAvailable,
        price,
        averageRating,
        totalRatings,
    } = spot;

    const [liked, setLiked] = useState(false);
    const [saveSpot] = useSaveSpotMutation();
    const [unsaveSpot] = useUnsaveSpotMutation();
    const { data: userData, error, isLoading } = useGetUserQuery();
    const { data: savedSpots } = useGetAllSavedSpotsQuery(); 
    const role = userData?.user?.role;

    

    useEffect(() => {
        if (savedSpots?.savedLands) {
            const isLiked = savedSpots.savedLands.some(land => land._id === _id);
            setLiked(isLiked);
        }
    }, [savedSpots, _id]);


   

    const handleClick = () => {
        if (!userData || role !== 'traveler') {
            toast.error("Please login first.");
            return;
        }

        if (liked) {
            // Unsave the spot
            unsaveSpot(_id)
                .unwrap()
                .then(() => {
                    setLiked(false); 
                })
                .catch(() => {
                    toast.error("Something went wrong while unsaving the spot.");
                });
        } else {
            // Save the spot
            saveSpot(_id)
                .unwrap()
                .then(() => {
                    setLiked(true); 
                })
                .catch(() => {
                    toast.error("Something went wrong while saving the spot.");
                });
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                mb: 3,
                borderRadius: 3,
                p: 0,
                boxShadow: "0 8px 24px 0 #21353f14",
                overflow: "hidden",
                border: "1.5px solid #eef4f8"
            }}
        >
            {/* Image with overlay */}
            <Box sx={{
                position: "relative",
                width: { xs: "100%", md: 250 },
                height: { xs: 280, md: 280 },
                flexShrink: 0
            }}>
                <CardMedia
                    component="img"
                    image={image[0]}
                    alt={spotName}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </Box>

            {/* Info */}
            <Box sx={{ flex: 1, p: { xs: 2, md: 3 }, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5, lineHeight: 1.2 }}>
                                {spotName}
                            </Typography>
                        </Box>

                        <Box>
                            <p
                                className={`hidden py-2 px-4 rounded-full font-semibold md:block md:flex md:justify-center ${isAvailable ? 'bg-green-100 text-green-900' : 'bg-gray-300 text-gray-700'}`}
                            >
                                {isAvailable ? 'Available' : 'Unavailable'}
                            </p>
                        </Box>
                    </Box>

                    <Stack direction="row" alignItems="center" spacing={1} mb={0.6}>
                        <LocationOnIcon sx={{ fontSize: 18, color: "#888" }} />
                        <Typography variant="body2" color="text.secondary">
                            {location}
                        </Typography>
                    </Stack>
                </Box>

                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={2} mb={1.1} mt={0.6}>
                            <Stack direction="row" alignItems="center" spacing={0.2}>
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <StarIcon
                                        key={i}
                                        sx={{
                                            color: i <= Math.floor(averageRating) ? "#37b7ae" : "#ccc", // teal or gray
                                            fontSize: 19,
                                        }}
                                    />
                                ))}
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={0.4}>
                                <LocalCafeIcon sx={{ fontSize: 18, color: "#232323" }} />
                                <Typography variant="body2" sx={{ color: "#222", fontWeight: 500 }}>
                                    {amenities?.length || 0} Amenities
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1.2} mb={1.6}>
                            <Box sx={{
                                border: "1.5px solid #b2d9c6",
                                borderRadius: "7px",
                                px: 1.1,
                                py: 0.4,
                                minWidth: 37,
                                textAlign: "center",
                                background: "#fff"
                            }}>
                                <Typography sx={{ fontWeight: 600, color: "#1b2c24", fontSize: 16 }} >
                                    {averageRating}
                                </Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 700, color: "#232323", fontSize: 16 }}>
                                {getRatingText(averageRating)}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 400 }}>
                                {totalRatings} reviews
                            </Typography>
                        </Stack>
                    </Box>

                    <Box>
                        <div className="flex gap-8 items-center">
                            <div className="md:hidden bg-teal-100 w-[100px] py-1 h-[40px] flex items-center justify-center rounded-full ">
                                <p className="text-teal-900">Available</p>
                            </div>

                            <div>
                                <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.4 }}>
                                        Per Night
                                    </Typography>
                                    <Typography sx={{ fontWeight: 700, fontSize: 20, color: "#37979C", lineHeight: 1.1 }}>
                                        $ {price}
                                    </Typography>
                                </Box>
                            </div>
                        </div>
                    </Box>
                </Box>

                <Divider sx={{ my: 2, borderColor: "#f0f0f0" }} />

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ flex: 2, display: "flex", gap: 2 }}>
                        <IconButton
                            onClick={handleClick}
                            sx={{
                                border: "2px solid #b2d9c6",
                                borderRadius: 2,
                                background: 'fff',
                                p: 1.3,
                                transition: "all 0.3s ease"
                            }}
                        >
                            {liked ? (
                                <IoMdHeart style={{ color: "#468F9D", fontSize: 27 }} />
                            ) : (
                                <IoMdHeartEmpty style={{ color: "#468F9D", fontSize: 27 }} />
                            )}
                        </IconButton>
                        <Link
                            to={`/details/${_id}`}
                            className="w-full bg-[#468F9D] flex justify-center items-center rounded-xl text-white font-medium md:text-[18px] md:font-semibold"
                        >
                            View Details
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default SpotCard;

