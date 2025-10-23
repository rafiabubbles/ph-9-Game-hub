import React, { useState, useEffect } from "react";
import AllGamesData from "../../public/allGamesData.json";
import { FiDownload } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";

const AllGames = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const term = search.trim().toLowerCase();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const searchGames = term
        ? AllGamesData.filter(
            (game) =>
                game.title.toLowerCase().includes(term) ||
                game.category.toLowerCase().includes(term)
        )
        : AllGamesData;

    if (loading) return <Loader />;

    return (
        <div className="p-6 pt-28 max-w-7xl mx-auto">
            {/* Header */}
            <h1 className="text-center font-extrabold text-4xl mb-2 text-[#001931]">
                Popular Games
            </h1>
            <p className="text-center text-gray-600 mb-6">
                Explore all trending games developed by top studios
            </p>

            {/* Search Bar & Product Count */}
            <div className="flex flex-col md:flex-row justify-between items-center px-4 py-4 mb-6 border-b pb-4 gap-4 md:gap-0">
                <h2 className="text-xl font-semibold text-gray-700">
                    All Games{" "}
                    <span className="text-xs text-gray-400">
                        ({searchGames.length} Game{searchGames.length !== 1 ? "s" : ""})
                    </span>
                </h2>

                <div className="relative w-full max-w-md">
                    <svg
                        className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.3-4.3"></path>
                    </svg>
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search games by title or category..."
                        className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 transition"
                    />
                </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchGames.length > 0 ? (
                    searchGames.map((game) => (
                        <Link
                            key={game.id}
                            to={`/games/${game.id}`}
                            className="bg-white shadow-lg rounded-xl p-4 flex flex-col hover:shadow-2xl transition border border-blue-200 border-dashed"
                        >
                            <div className="w-full h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden text-gray-500 text-sm">
                                {game.coverPhoto ? (
                                    <img
                                        src={game.coverPhoto}
                                        alt={game.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    "Image Placeholder"
                                )}
                            </div>

                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 leading-tight">
                                {game.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-2">
                                <span className="font-medium">Category:</span> {game.category} |{" "}
                                <span className="font-medium">Developer:</span> {game.developer}
                            </p>

                            <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                                {game.description}
                            </p>

                            <div className="flex justify-between items-center mt-auto">
                                <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                    <FiDownload className="mr-1" />
                                    Download
                                </div>
                                <div className="flex items-center bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                                    <FaStar className="mr-1" />
                                    {game.ratings}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-lg col-span-full py-10">
                        No games found matching your search:{" "}
                        <span className="font-semibold text-gray-700">"{search}"</span> 😔
                    </p>
                )}
            </div>
        </div>
    );
};

export default AllGames;
