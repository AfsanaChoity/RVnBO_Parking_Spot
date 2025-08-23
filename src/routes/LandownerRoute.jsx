import { Navigate, Outlet } from "react-router-dom";
import LoadingComponent from "../components/common/LoadingComponent";
import { useAuth } from "../redux/hooks";
import { useGetUserQuery } from "../redux/api/authApi";

export default function LandownerRoute() {
    const { token } = useAuth();
    const { data: userData, isLoading } = useGetUserQuery(undefined, { skip: !token });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingComponent />
            </div>
        );
    }

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    if (userData?.user?.role !== "landowner") {
       
        return <Navigate to="/traveler/dashboard" replace />;
    }

    return <Outlet />;
}
