import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameData from "../../public/HomeData.json";
import { FaStar } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const DetailButton = ({ text, onClick }) => (
    <button
        onClick={onClick}
        className="
      flex items-center justify-center space-x-2
      w-full py-3 px-6 rounded-xl
      font-extrabold text-white text-lg
      bg-gradient-to-r from-[#8a2be2] to-[#ff00ff]
      border border-[#a020f0]
      shadow-[0_0_15px_rgba(138,43,226,0.6)]
      transition duration-300 ease-in-out
      hover:shadow-[0_0_20px_rgba(255,0,255,0.8)]
    "
    >
        <span>{text}</span>
        <HiArrowRight className="text-xl" />
    </button>
);

const cardVariants = {
    hover: {
        scale: 1.03,
        y: -10,
        boxShadow: "0px 20px 40px rgba(0,0,0,0.5)",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
        },
    },
};

const overlayVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 20,
            delay: 0.1,
        },
    },
};

const GameCard = () => {
    const [hoveredCardId, setHoveredCardId] = useState(null);

    return (
        <div className="p-6 md:p-10">
            <h1 className="text-center font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4 text-[#001931]">
                Popular Games
            </h1>
            <p className="text-center text-gray-600 text-sm sm:text-base mb-10 px-4 sm:px-20">
                Explore all trending games developed by top studios
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <Suspense fallback={<span>Loading...</span>}>
                    {GameData.map((game) => (
                        <motion.div
                            key={game.id}
                            className="
                relative rounded-xl overflow-hidden cursor-pointer 
                h-72 sm:h-80 md:h-96 border border-blue-200 border-dashed
                bg-white
              "
                            whileHover="hover"
                            variants={cardVariants}
                            onMouseEnter={() => setHoveredCardId(game.id)}
                            onMouseLeave={() => setHoveredCardId(null)}
                        >
                            {/* Game Image */}
                            <div className="w-full h-full">
                                {game.coverPhoto ? (
                                    <img
                                        src={game.coverPhoto}
                                        alt={game.title}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                                        Image Placeholder
                                    </div>
                                )}
                            </div>

                            {/* Overlay */}
                            <AnimatePresence>
                                {hoveredCardId === game.id && (
                                    <motion.div
                                        className="
                      absolute inset-0
                      bg-gray-900 bg-opacity-90 backdrop-blur-sm
                      rounded-xl p-4 flex flex-col justify-end text-white
                    "
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={overlayVariants}
                                    >
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 leading-tight">
                                            {game.title}
                                        </h3>

                                        <div className="flex items-center text-base sm:text-lg font-bold mb-4">
                                            <FaStar className="mr-2 text-yellow-400" />
                                            {game.ratings}
                                        </div>

                                        <DetailButton
                                            text="Game Details"
                                            onClick={() =>
                                                game.downloadLink &&
                                                window.open(game.downloadLink, "_blank")
                                            }
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </Suspense>
            </div>
        </div>
    );
};

export default GameCard;
