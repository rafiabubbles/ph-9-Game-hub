import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        Swal.fire({
            icon: "warning",
            title: "Please log in to continue",
            showConfirmButton: false,
            timer: 1500,
        });
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
