import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center w-full max-w-md">
                {/* Profile Picture */}
                <img
                    src={
                        user?.profileImage ||
                        `https://ui-avatars.com/api/?name=${user?.name || user?.email}`
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-purple-500 object-cover mb-6"
                />

                {/* Name */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {user?.name || "User Name"}
                </h1>

                {/* Email */}
                <p className="text-gray-600 mb-6">{user?.email || "user@example.com"}</p>

                {/* Update Info Button */}
                <button
                    onClick={() => navigate("/update-profile")}
                    className="px-6 py-3 mb-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition w-full"
                >
                    Update Information
                </button>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition w-full"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default MyProfile;
