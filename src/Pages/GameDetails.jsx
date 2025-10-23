import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AllGamesData from "../../public/allGamesData.json";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import Loader from "../Components/Loader";
import Swal from "sweetalert2";

const SingleGame = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const foundGame = AllGamesData.find((g) => String(g.id) === id);
            setGame(foundGame);
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [id]);

    if (loading) return <Loader />;

    if (!game) {
        return (
            <div className="p-6 pt-20 max-w-5xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Game Not Found 😔</h1>
                <p className="text-gray-600 mb-8">
                    The game with ID "{id}" does not exist.
                </p>
                <Link
                    to="/games"
                    className="text-blue-500 hover:text-blue-700 flex items-center justify-center font-medium transition"
                >
                    <FaArrowLeft className="mr-2" /> Go back to All Games
                </Link>
            </div>
        );
    }

    const handleAddToMyGames = () => {
        const savedGames = JSON.parse(localStorage.getItem("myGames")) || [];
        const exists = savedGames.find((g) => g.id === game.id);

        if (exists) {
            Swal.fire({
                icon: "info",
                title: "Already Added",
                text: `${game.title} is already in your library!`,
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
            return;
        }

        const updatedGames = [...savedGames, game];
        localStorage.setItem("myGames", JSON.stringify(updatedGames));
        window.dispatchEvent(new Event("myGamesUpdated"));

        Swal.fire({
            icon: "success",
            title: "Added!",
            text: `${game.title} has been added to your library.`,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });
    };

    return (
        <div className="p-6 pt-24 max-w-5xl mx-auto">
            <Link
                to="/games"
                className="text-blue-500 hover:text-blue-700 flex items-center font-medium mb-6 transition duration-150"
            >
                <FaArrowLeft className="mr-2" /> Back to All Games
            </Link>

            <h2 className="text-center font-extrabold text-3xl mb-6 text-[#001931]">
                Game Details
            </h2>

            <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 border border-gray-200">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Game Image */}
                    <div className="lg:w-1/3">
                        <div className="w-full h-72 lg:h-96 bg-gray-100 rounded-lg overflow-hidden shadow-lg border-2 border-gray-100">
                            {game.coverPhoto ? (
                                <img
                                    src={game.coverPhoto}
                                    alt={game.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg">
                                    Image Placeholder
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Game Info */}
                    <div className="lg:w-2/3 flex flex-col">
                        <h1 className="text-4xl font-extrabold text-[#001931] mb-2">
                            {game.title}
                        </h1>

                        <div className="text-gray-600 text-lg mb-6 flex flex-wrap items-center gap-2 sm:gap-4">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                {game.category}
                            </span>
                            <span className="text-gray-700">|</span>
                            <span className="font-medium text-gray-700">
                                Developer: {game.developer}
                            </span>
                            <span className="text-gray-700">|</span>
                            <div className="flex items-center text-orange-600 font-medium">
                                <FaStar className="mr-1 text-yellow-500" />
                                {game.ratings}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <a
                                href={game.downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full sm:w-64 px-6 py-3 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                            >
                                <FiDownload className="mr-2 h-5 w-5" />
                                Download
                            </a>

                            <button
                                onClick={handleAddToMyGames}
                                className="inline-flex items-center justify-center w-full sm:w-64 px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                            >
                                Add to My Games
                            </button>
                        </div>

                        {/* Game Overview */}
                        <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
                            Game Overview
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
                            {game.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleGame;
