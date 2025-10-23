import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import GameData from "../../public/HomeData.json";

const DetailButton = ({ text, onClick }) => (
    <motion.button
        onClick={onClick}
        className="
            flex items-center justify-center space-x-2
            py-3 px-6 rounded-xl font-extrabold text-white text-lg
            bg-gradient-to-r from-[#8a2be2] to-[#ff00ff]
            border border-[#a020f0]
            shadow-[0_0_15px_rgba(138,43,226,0.6)]
            transition duration-300 ease-in-out
            hover:shadow-[0_0_20px_rgba(255,0,255,0.8)]
            whitespace-nowrap
        "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <span>{text}</span>
        <HiArrowRight className="text-xl" />
    </motion.button>
);

const BannerSlider = () => {
    const images = GameData.slice(0, 5).map(game => ({
        id: game.id,
        src: game.coverPhoto || null,
        alt: game.title,
        title: game.title,
        downloadLink: game.downloadLink
    }));

    const totalSlides = images.length;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [currentIndex]);

    useEffect(() => {
        if (totalSlides < 2) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % totalSlides);
        }, 6000);
        return () => clearInterval(interval);
    }, [totalSlides]);

    const nextSlide = () => setCurrentIndex((currentIndex + 1) % totalSlides);
    const prevSlide = () => setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides);

    const bannerVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
        transition: { duration: 0.8, ease: "easeInOut" }
    };

    const currentImage = images[currentIndex];

    const FeaturedImage = () => {
        const placeholderUrl = `https://placehold.co/600x400/1e293b/ffffff?text=${encodeURIComponent(currentImage.title.toUpperCase())}+IMAGE`;
        const imageSrc = (!currentImage.src || imageError) ? placeholderUrl : currentImage.src;

        return (
            <div className="w-full flex justify-center items-center">
                <img
                    src={imageSrc}
                    alt={`${currentImage.title} Banner Image`}
                    className="w-full max-h-[300px] sm:max-h-[350px] md:max-h-[450px] object-cover rounded-xl shadow-2xl transition duration-500"
                    onError={() => currentImage.src && setImageError(true)}
                />
            </div>
        );
    };

    return (
        <div className="pt-20 pb-10 px-4 sm:px-6 md:px-10 flex justify-center">
            <div className="w-full max-w-6xl relative overflow-hidden rounded-2xl shadow-2xl border-2 border-blue-200 border-dashed h-[400px] sm:h-[450px] md:h-[500px] bg-gray-900">
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={currentImage.id}
                        className="absolute inset-0 w-full h-full p-4 sm:p-8"
                        variants={bannerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <div className="w-full h-full grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                            {/* Text Content */}
                            <div className="flex flex-col justify-center h-full col-span-1 md:col-span-3 text-center md:text-left">
                                <motion.h2
                                    className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    {currentImage.title}
                                </motion.h2>

                                <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6">
                                    Deploy, survive, and conquer the battlefield! Experience intense battle royale action and stunning graphics. Click "View Details" for mission specs.
                                </p>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="flex justify-center md:justify-start"
                                >
                                    <DetailButton
                                        text="View Details"
                                        onClick={() => currentImage.downloadLink && window.open(currentImage.downloadLink, "_blank")}
                                    />
                                </motion.div>
                            </div>

                            {/* Image */}
                            <motion.div
                                className="flex justify-center items-center col-span-1 md:col-span-2 w-full"
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <FeaturedImage />
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {totalSlides > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/30 hover:bg-white/50 text-white transition z-10"
                        >
                            <HiArrowLeft className="text-3xl" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/30 hover:bg-white/50 text-white transition z-10"
                        >
                            <HiArrowRight className="text-3xl" />
                        </button>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                            {images.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-3 w-3 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'w-6 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] shadow-md shadow-[#8a2be2]/80'
                                        : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BannerSlider;
