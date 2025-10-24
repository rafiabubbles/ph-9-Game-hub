import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../Components/Loader";

const MyGames = () => {
    const [myGames, setMyGames] = useState([]);

    // Load saved games from localStorage
    useEffect(() => {
        const loadGames = () => {
            const savedGames = JSON.parse(localStorage.getItem("myGames")) || [];
            setMyGames(savedGames);
        };

        loadGames();

        // Listen to custom event "myGamesUpdated" to update state immediately
        window.addEventListener("myGamesUpdated", loadGames);

        return () => {
            window.removeEventListener("myGamesUpdated", loadGames);
        };
    }, []);

    // Remove game from MyGames
    const removeGame = (id) => {
        const updated = myGames.filter((game) => game.id !== id);
        setMyGames(updated);
        localStorage.setItem("myGames", JSON.stringify(updated));

        // Trigger custom event so any page/component listening can update
        window.dispatchEvent(new Event("myGamesUpdated"));

        Swal.fire({
            icon: "success",
            title: "Removed!",
            text: "The game has been removed from your library.",
            timer: 1200,
            showConfirmButton: false,
        });
    };

    return (
        <div className="max-w-4xl mx-auto mt-24 px-6 py-10">
            <h1 className="text-4xl font-extrabold text-purple-600 mb-8 text-center">
                🎮 My Games Library
            </h1>

            {myGames.length === 0 ? (
                <div className="text-center text-gray-500 py-20">
                    <img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-svg-download-png-6024626.png"
                        alt="Empty"
                        className="w-56 mx-auto mb-6"
                    />
                    <p className="text-xl">No games downloaded yet.</p>
                </div>
            ) : (
                <ul className="space-y-5">
                    {myGames.map((game) => (
                        <li
                            key={game.id}
                            className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 border border-gray-100 hover:shadow-lg transition"
                        >
                            {/* Left: Image */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={game.coverPhoto}
                                    alt={game.title}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />

                                {/* Middle: Game Info */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {game.title}
                                    </h2>
                                    <div className="flex items-center text-yellow-500 font-medium mt-1">
                                        <FaStar className="mr-1" /> {game.ratings || "5.0"}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Remove Button */}
                            <button
                                onClick={() => removeGame(game.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
                            >
                                Remove ❌
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyGames;
