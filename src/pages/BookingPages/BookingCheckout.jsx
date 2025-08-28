import { useState, useEffect } from "react";
import { MapPin, Calendar, Shield } from "lucide-react";
import { Divider, Radio } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import BookingCheckoutForm from "../../components/Booking/BookingCheckoutForm";
import { DatePicker } from "antd"; // Use Ant Design DatePicker for date selection
import dayjs from "dayjs"; // For easy date manipulation
import img1 from "../../assets/icons/vector.png"; // Example image

function getRatingText(rating) {
    if (!rating || rating === 0) return "No Rating";
    if (rating < 2) return "Poor";
    if (rating < 3) return "Fair";
    if (rating < 4) return "Good";
    if (rating < 4.5) return "Very Good";
    return "Excellent";
}

export default function BookingCheckout() {
    const [paymentOption, setPaymentOption] = useState("full");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [nights, setNights] = useState(0);

    const location = useLocation();
    const { spotDetails } = location.state || {};

    // Fetch check-in and check-out dates from localStorage, if available
    useEffect(() => {
        const storedCheckIn = localStorage.getItem("checkInDate");
        const storedCheckOut = localStorage.getItem("checkOutDate");

        // If check-in and check-out dates are not found in localStorage, set today's date as default
        if (storedCheckIn && storedCheckOut) {
            setCheckInDate(dayjs(storedCheckIn));
            setCheckOutDate(dayjs(storedCheckOut));
        } else {
            const today = dayjs(); // Default to today's date if no date is found
            setCheckInDate(today);
            setCheckOutDate(today);
        }
    }, []);

    // Handle check-in date change
    const handleCheckInChange = (date) => {
        setCheckInDate(date);
        localStorage.setItem("checkInDate", date.format()); // Store in localStorage
    };

    // Handle check-out date change
    const handleCheckOutChange = (date) => {
        setCheckOutDate(date);
        localStorage.setItem("checkOutDate", date.format()); // Store in localStorage
    };

    // Calculate the number of nights whenever check-in or check-out date changes
    useEffect(() => {
        if (checkInDate && checkOutDate) {
            const duration = checkOutDate.diff(checkInDate, "day");
            setNights(duration);
        }
    }, [checkInDate, checkOutDate]);

    const handlePaymentChange = (event) => {
        setPaymentOption(event.target.value);
    };

    return (
        <div className="py-8">
            <div className="px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Booking Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Room Details Card */}
                        <div className="rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="md:flex md:justify-between md:items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        {spotDetails?.land?.spot}
                                    </h2>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        <span className="text-sm">{spotDetails?.land?.location}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold" style={{ color: "#468F9D" }}>
                                        ${spotDetails?.land?.price}
                                    </span>
                                    <span className="text-gray-600">/night</span>
                                </div>
                            </div>

                            {/* Check-in/Check-out */}
                            <div className="">
                                {/* Display Check-In and Check-Out Dates */}
                                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mb-4">
                                    {/* Check-In Section */}
                                    <div className="text-center">
                                        <div className="text-sm font-semibold md:text-[16px] text-gray-900">
                                            {checkInDate ? checkInDate.format("dddd, MMM D") : "Select Check-In"}
                                        </div>
                                        <div className="text-xs md:text-sm text-gray-600">Check-in</div>
                                    </div>

                                    {/* Image and Arrows */}
                                    <div className="flex items-center px-4 gap-3">
                                        <FaLongArrowAltLeft />
                                        <img src={img1} alt="calender" className="w-12 h-12 object-cover" />
                                        <FaLongArrowAltRight />
                                    </div>

                                    {/* Check-Out Section */}
                                    <div className="text-center">
                                        <div className="text-sm md:text-[16px] font-semibold text-gray-900">
                                            {checkOutDate ? checkOutDate.format("dddd, MMM D") : "Select Check-Out"}
                                        </div>
                                        <div className="text-xs md:text-sm text-gray-600">Check-out</div>
                                    </div>
                                </div>

                                {/* Calendar for Selecting Dates */}
                                <div className="mb-4 flex flex-col md:flex-row gap-4">
                                    <DatePicker
                                        placeholder="Select Check-In Date"
                                        value={checkInDate}
                                        onChange={handleCheckInChange}
                                        className="mr-4"
                                        format="YYYY-MM-DD"
                                    />
                                    <DatePicker
                                        placeholder="Select Check-Out Date"
                                        value={checkOutDate}
                                        onChange={handleCheckOutChange}
                                        format="YYYY-MM-DD"
                                    />
                                </div>

                                {/* Display the Number of Nights */}
                                <div className="inline-block bg-gray-100 px-3 py-1 rounded text-sm text-gray-700">
                                    {nights > 0 ? `${nights} Night${nights > 1 ? "s" : ""}` : "Select Dates"}
                                </div>
                            </div>

                            {/* Payment Options */}
                            <div className="mt-6">
                                <div className="space-y-3">
                                    <label className="flex items-center p-4 border rounded-lg  border-gray-200 shadow-sm">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="full"
                                            checked={paymentOption === "full"}
                                            onChange={() => handlePaymentChange("full")}
                                            className="w-4 h-4 mr-3 cursor-pointer"
                                            style={{ accentColor: "#468F9D" }}
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900">Pay in full</div>
                                            <div className="text-sm text-gray-600">Pay the total and you are all set</div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Personal Information Section */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <BookingCheckoutForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Summary */}
                    <div className="lg:col-span-1">
                        <div className="rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                            {/* Property Image and Details */}
                            <div className="flex gap-4 mb-6">
                                <img
                                    src={spotDetails?.land?.image[0]}
                                    alt="Property"
                                    className="w-26 h-26 rounded-lg object-cover"
                                />
                                <div className="flex flex-col justify-between flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">{spotDetails?.land?.spot}</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="px-1 py-1 rounded text-xs text-[#468F9D] font-semibold border border-[#468F9D]">
                                            {spotDetails?.land?.averageRating}
                                        </div>
                                        <span className="text-xs text-gray-700">
                                            <span className="font-semibold">{getRatingText(spotDetails?.land?.averageRating)}</span> <br /> {spotDetails?.land?.totalRatings} reviews
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Protection Notice */}
                            <div className="flex items-center gap-2 mb-6 p-3 bg-gray-50 rounded-lg">
                                <Shield className="w-4 h-4" style={{ color: "#468F9D" }} />
                                <span className="text-sm text-gray-700">
                                    Your booking is protected by <strong>Stripe Payment</strong>
                                </span>
                            </div>

                            {/* Price Details */}
                            <div className="space-y-3">
                                <h4 className="font-semibold text-gray-900 mb-4">Price Details</h4>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Per Night</span>
                                    <span className="text-gray-900">${spotDetails?.land?.price}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Night</span>
                                    <span className="text-gray-900">{nights}</span>
                                </div>

                                <hr className="my-4" />

                                <div className="flex justify-between font-semibold text-lg">
                                    <span className="text-gray-900">Total Price</span>
                                    <span className="text-gray-900">${spotDetails?.land?.price * nights}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
