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
// import LandownerDashboard from "../pages/LandownerPages/Dashboard";

// Private Routes
import TravelerRoute from "./TravelerRoute";
import LandownerRoute from "./LandownerRoute";
import MyBookings from "../pages/TravelerPages/MyBookings";
import SavedSpots from "../pages/TravelerPages/SavedSpots";
import ProfileSetting from "../pages/TravelerPages/ProfileSetting";

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
        { index: true, element: <SavedSpots/> },  
      ],
    },
    {
      path: "profile",
      element: <PrivateLayout />,
      children: [
        { index: true, element: <ProfileSetting/> },  
      ],
    },
  ],
}


  // Landowner Routes (Protected)
  // {
  //   path: "/landowner",
  //   element: <LandownerRoute />, // ✅ check landowner role
  //   children: [
  //     {
  //       path: "dashboard",
  //       element: <PrivateLayout />, // ✅ reuse same PrivateLayout or make LandownerLayout
  //       children: [
  //         { path: "", element: <LandownerDashboard /> },
  //       ],
  //     },
  //   ],
  // },

]);

export default router;
