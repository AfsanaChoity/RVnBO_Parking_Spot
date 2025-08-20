import { createBrowserRouter } from "react-router";
import RoleSelectionPage from "../components/Auth/RoleSelectionPage";
import SignUp from "../components/Auth/SignUp";
import VerificationPage from "../components/Auth/VarificationPage";
import Login from "../components/Auth/Login";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ResetPassword from "../components/Auth/ResetPassword";
import PasswordResetSuccess from "../components/Auth/PasswordResetSuccess";
import CommonLayout from "../components/Layout/CommonLayout";
import LandingPage from "../pages/PublicPages/LandingPage";
import VerifyResetPassword from "../components/Auth/VerifyResetPassword";
import ContactUs from "../pages/PublicPages/ContactUs";
import HowItWorkPage from "../pages/PublicPages/HowItWorkPage";
import DiscoverSpot from "../pages/PublicPages/DiscoverSpot";

const router = createBrowserRouter([

// Public Routes
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,

      },
      {
        path: "/contact",
        element: <ContactUs/>,
      },
      {
        path: "/how-it-works",
        element: <HowItWorkPage/>,
      },
      {
        path: "/spots",
        element: <DiscoverSpot/>,
      }
    ],
  },


  // Onboarding process routes
  {
    path: "/onboarding/role",
    element: <RoleSelectionPage/>
  },

  // Authentication routes
  {
    path: "/auth/signup",
    element: <SignUp/>,
  },
  {
    path: "/auth/verification",
    element: <VerificationPage/>,
  },

  {
    path: "/auth/login",
    element: <Login/>,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword/>,
  },
  {
    path: "/auth/otp",
    element: <VerifyResetPassword />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/auth/reset/success",
    element: <PasswordResetSuccess/>,
  },

]);

export default router;