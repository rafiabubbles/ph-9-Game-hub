import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";


const Register = () => {
    const { register, googleLogin } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // ✅ Password validation function
    const isPasswordValid = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 6;
        return hasUppercase && hasLowercase && hasMinLength;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordValid(password)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Password ❌",
                text: "Password must have at least 1 uppercase, 1 lowercase letter, and 6+ characters.",
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Passwords do not match ❌",
            });
            return;
        }

        const result = await register(name, email, password, photoURL);

        if (result.success) {
            Swal.fire({
                icon: "success",
                title: "Registration Successful ✅",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/login");
        } else {
            Swal.fire({
                icon: "error",
                title: "Registration Failed ❌",
                text: result.message,
            });
        }
    };

    const handleGoogleLogin = async () => {
        const result = await googleLogin();
        if (result.success) {
            Swal.fire({
                icon: "success",
                title: "Login Successful ✅",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/");
        } else {
            Swal.fire({
                icon: "error",
                title: "Login Failed ❌",
                text: result.message,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 pt-24">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-purple-500">
                    GameHub Register
                </h1>

                {/* Name */}
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-700 p-3 rounded-xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-700 p-3 rounded-xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {/* Photo URL */}
                <input
                    type="text"
                    placeholder="Photo URL"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full border border-gray-700 p-3 rounded-xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-700 p-3 rounded-xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {/* Confirm Password */}
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full border border-gray-700 p-3 rounded-xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {/* Register Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] py-3 rounded-xl font-semibold text-white shadow-md hover:from-[#6a0dad] hover:to-[#c71585] transition"
                >
                    Register
                </button>

                {/* Google Login */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex justify-center items-center gap-2 border border-purple-500 text-purple-500 py-3 rounded-xl hover:bg-purple-600 hover:text-white transition"
                >
                    <span>Register with Google</span>
                    <div> <FcGoogle /></div>
                </button>

                {/* Link to Login */}
                <p className="text-center text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-purple-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
