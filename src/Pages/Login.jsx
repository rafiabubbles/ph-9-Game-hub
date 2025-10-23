import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            Swal.fire({
                icon: "success",
                title: "Login Successful ✅",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/"); // Redirect to Home after login
        } else {
            Swal.fire({
                icon: "error",
                title: "Login Failed ❌",
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
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 pt-20">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-purple-500">
                    GameHub Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-700 p-3 rounded-xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-700 p-3 rounded-xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />

                <p className="text-right text-sm mt-2">
                    <button
                        onClick={() => navigate("/forgot-password", { state: { email } })}
                        className="text-blue-600 hover:underline"
                    >
                        Forgot Password?
                    </button>
                </p>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] py-3 rounded-xl font-semibold text-white shadow-md hover:from-[#6a0dad] hover:to-[#c71585] transition"
                >
                    Login
                </button>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex justify-center items-center gap-2 border border-purple-500 text-purple-500 py-3 rounded-xl hover:bg-purple-600 hover:text-white transition"
                >
                    <span>Login with Google </span>
                    <div> <FcGoogle /></div>
                </button>

                <p className="text-center text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-purple-500 hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
