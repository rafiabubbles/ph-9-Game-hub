import React, { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    // ✅ Auto-fill email if it was passed from login page
    useEffect(() => {
        const stateEmail = location.state?.email || "";
        setEmail(stateEmail);
    }, [location.state]);

    const handleReset = async (e) => {
        e.preventDefault();

        if (!email) {
            Swal.fire("Error", "Please enter your email address", "error");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Swal.fire({
                icon: "success",
                title: "Reset Email Sent",
                text: "Please check your Gmail to reset your password.",
            });

            // ✅ Redirect user to Gmail
            window.location.href = "https://mail.google.com/";
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 to-blue-200">
            <form
                onSubmit={handleReset}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
                <p className="text-gray-600 text-center mb-6">
                    Enter your registered email address to reset your password.
                </p>

                <label className="block text-gray-700 mb-2">Email Address</label>
                <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />

                <button
                    type="submit"
                    className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-300"
                >
                    Reset Password
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full mt-4 text-cyan-600 hover:underline"
                >
                    Back to Login
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
