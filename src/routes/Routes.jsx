import { createBrowserRouter } from "react-router";

// Auth + Common
import RoleSelectionPage from "../components/Auth/RoleSelectionPage";
import SignUp from "../components/Auth/SignUp";
import VerificationPage from "../components/Auth/VarificationPage";
import Login from "../components/Auth/Login";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ResetPassword from "../components/Auth/ResetPassword";
import PasswordResetSuccess from "../components/Auth/PasswordResetSuccess";
import VerifyResetPassword from "../components/Auth/VerifyResetPassword";

// Layouts
import CommonLayout from "../components/Layout/CommonLayout";
import PrivateLayout from "../components/Layout/PrivateLayout";

// Public Pages
import LandingPage from "../pages/PublicPages/LandingPage";
import ContactUs from "../pages/PublicPages/ContactUs";
import HowItWorkPage from "../pages/PublicPages/HowItWorkPage";
import DiscoverSpot from "../pages/PublicPages/DiscoverSpot";

// Traveler Pages
import TravelerDashboard from "../pages/TravelerPages/TravelerDashboard";

// Landowner Pages


// Private Routes
import TravelerRoute from "./TravelerRoute";
import LandownerRoute from "./LandownerRoute";
import MyBookings from "../pages/TravelerPages/MyBookings";
import SavedSpots from "../pages/TravelerPages/SavedSpots";
import ProfileSetting from "../pages/TravelerPages/ProfileSetting";
import HostProfile from "../pages/LandownerPages/HostProfile";
import MyEarning from "../pages/LandownerPages/MyEarning";
import HostOverview from "../pages/LandownerPages/HostOverview";
import MySpots from "../pages/LandownerPages/MySpots";
import AboutUs from "../pages/PublicPages/AboutUs";
import PrivacyPolicy from "../pages/PublicPages/PrivacyPolicy";
import TermsConditions from "../pages/PublicPages/TermsConditions";
import PrivateRoute from "./PrivateRoute";
import SpotDetails from "../pages/CommonPages/SpotDetails";
import ReviewsTable from "../pages/LandownerPages/ReviewsTable";
import BookingCheckout from "../pages/BookingPages/BookingCheckout";
import ChatInbox from "../pages/CommonPages/ChatInbox";

const router = createBrowserRouter([

  // Public Routes
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/how-it-works", element: <HowItWorkPage /> },
      { path: "/spots", element: <DiscoverSpot /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-conditions", element: <TermsConditions /> },

      // Private route
      {
        element: <PrivateRoute />,   
        children: [
          { path: "/details/:id", element: <SpotDetails /> },
          { path: "/inbox", element: <ChatInbox /> },
        ],
      },

       {
        element: <TravelerRoute />,   
        children: [
          { path: "/booking-checkout", element: <BookingCheckout/> },
          
          
        ],
      },

    ],
  },

  // Onboarding Routes
  { path: "/onboarding/role", element: <RoleSelectionPage /> },

  // Authentication Routes
  { path: "/auth/signup", element: <SignUp /> },
  { path: "/auth/verification", element: <VerificationPage /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/forgot-password", element: <ForgotPassword /> },
  { path: "/auth/otp", element: <VerifyResetPassword /> },
  { path: "/auth/reset-password", element: <ResetPassword /> },
  { path: "/auth/reset/success", element: <PasswordResetSuccess /> },




  // Traveler Routes (Protected)
  {
    path: "/traveler",
    element: <TravelerRoute />,
    children: [
      {
        path: "dashboard",
        element: <PrivateLayout />,
        children: [
          { index: true, element: <TravelerDashboard /> },
        ],
      },
      // {
      //   path: "bookings",
      //   element: <PrivateLayout />,
      //   children: [
      //     { index: true, element: <MyBookings /> },  
      //   ],
      // },
      {
        path: "saved-spots",
        element: <PrivateLayout />,
        children: [
          { index: true, element: <SavedSpots /> },
        ],
      },
      {
        path: "profile",
        element: <PrivateLayout />,
        children: [
          { index: true, element: <ProfileSetting /> },
        ],
      },
    ],
  },


  // Landowner Routes (Protected)
  {
    path: "/host",
    element: <LandownerRoute />,
    children: [
      {
        path: "overview",
        element: <PrivateLayout />,
        children: [
          { index: true, element: <HostOverview /> },
        ],
      },
      {
        path: "profile",
        element: <PrivateLayout />,
        children: [
          { index: true, element: <HostProfile /> },
        ],
      },
      {
        path: "earnings",
        element: <PrivateLayout />,
        children: [
          { index: true, element: <MyEarning /> },
        ],
      },

      {
        path: "guest-reviews",
        element: <PrivateLayout />,
        children: [
          { index: true, element: <ReviewsTable /> },
        ],
      },

      {
        path: "spots",
        element: <PrivateLayout />,
        children: [
          { index: true, element: <MySpots /> },
        ],
      },
    ],
  },

]);

export default router;
