import React from "react";

const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-900 px-4">
            {/* Spinner with Game icon */}
            <div className="relative w-20 sm:w-24 h-20 sm:h-24 mb-6">
                <div className="absolute inset-0 w-full h-full border-4 sm:border-6 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex justify-center items-center text-3xl sm:text-4xl">
                    🎮
                </div>
            </div>

            {/* App Name */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-500 animate-pulse">
                GameHub
            </h1>

            {/* Loading text */}
            <p className="mt-2 text-gray-400 text-base sm:text-lg">
                Loading epic adventures...
            </p>
        </div>
    );
};

export default Loader;
