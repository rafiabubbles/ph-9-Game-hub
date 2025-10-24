import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BannerSlider from '../Components/BannerSlider';
import GameCard from '../Components/GameCard';
import Newsletter from '../Components/Newsletter';

const Home = () => {
    const [gameData, setGameData] = useState([]);

    // Fetch JSON from public folder safely
    useEffect(() => {
        fetch('/HomeData.json') // file is in public
            .then((res) => res.json())
            .then((data) => setGameData(data))
            .catch((err) => console.error('Error loading JSON:', err));
    }, []);

    const featuredGames = gameData.slice(0, 6);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Banner Slider */}
            <BannerSlider />

            {/* Featured Games Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-20">
                {/* Game Cards */}
                <GameCard games={featuredGames} />

                {/* View All Games Button */}
                <div className="mt-10 flex justify-center">
                    <Link
                        to="/games"
                        className="px-6 py-3 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff]                                    hover:from-[#6a0dad] hover:to-[#c71585] text-white rounded-xl 
                                   transition font-semibold shadow-lg"
                    >
                        View All Games
                    </Link>
                </div>
            </div>

            {/* Newsletter Section */}
            <Newsletter />
        </div>
    );
};

export default Home;
