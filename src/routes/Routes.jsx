import { createBrowserRouter } from "react-router";
import RoleSelectionPage from "../components/Auth/RoleSelectionPage";
import SignUp from "../components/Auth/SignUp";
import VerificationPage from "../components/Auth/VarificationPage";
import Login from "../components/Auth/Login";

const router = createBrowserRouter([

// Public Routes
  {
    path: "/",
    element: <div>This is home</div>,
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

]);

export default router;