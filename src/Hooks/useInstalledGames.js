import { useState, useEffect } from "react";

export const useInstalledGames = () => {
    const [installedGames, setInstalledGames] = useState([]);

    // Load installed games from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("installedGames");
        if (stored) {
            setInstalledGames(JSON.parse(stored));
        }
    }, []);

    // Check if a game is installed
    const isGameInstalled = (gameId) => {
        return installedGames.includes(gameId);
    };

    // Install a game
    const installGame = (gameId) => {
        if (!installedGames.includes(gameId)) {
            const updated = [...installedGames, gameId];
            setInstalledGames(updated);
            localStorage.setItem("installedGames", JSON.stringify(updated));
        }
    };

    return { installedGames, isGameInstalled, installGame };
};
