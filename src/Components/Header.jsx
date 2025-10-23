import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
    const { user, logout } = useAuth();
    const [openProfile, setOpenProfile] = useState(false);

    return (
        <div className="navbar bg-gray-900 text-white fixed top-0 z-50 shadow-md">
            {/* Logo */}
            <div className="flex-1">
                <Link to="/" className="text-2xl font-bold text-cyan-500">
                    Game<span className="text-white">Hub</span>
                </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-4">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "btn btn-info btn-outline"
                            : "btn btn-ghost text-white hover:bg-cyan-600"
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/games"
                    className={({ isActive }) =>
                        isActive
                            ? "btn btn-info btn-outline"
                            : "btn btn-ghost text-white hover:bg-cyan-600"
                    }
                >
                    Games
                </NavLink>
                <NavLink
                    to="/mygames"
                    className={({ isActive }) =>
                        isActive
                            ? "btn btn-info btn-outline"
                            : "btn btn-ghost text-white hover:bg-cyan-600"
                    }
                >
                    My Game
                </NavLink>

                {!user && (
                    <Link to="/login" className="btn btn-info text-white">
                        Login
                    </Link>
                )}

                {user && (
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                            onClick={() => setOpenProfile(!openProfile)}
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    src={
                                        user.profileImage ||
                                        `https://ui-avatars.com/api/?name=${user.email}`
                                    }
                                    alt="Profile"
                                />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 mt-4 text-gray-800"
                        >
                            <li>
                                <Link to="/profile">My Profile</Link>
                            </li>
                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-gray-900 rounded-box w-52 mt-4 text-white"
                    >
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/games">Games</NavLink>
                        </li>
                        <li>
                            <NavLink to="/mygames">My Game</NavLink>
                        </li>
                        {!user && (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )}
                        {user && (
                            <>
                                <li>
                                    <Link to="/profile">My Profile</Link>
                                </li>
                                <li>
                                    <button onClick={logout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
