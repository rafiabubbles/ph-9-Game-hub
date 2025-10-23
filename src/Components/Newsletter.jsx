import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const buttonVariants = {
    rest: {
        scale: 1,
        boxShadow: "0 0 15px rgba(138,43,226,0.6)",
    },
    hover: {
        scale: 1.05,
        boxShadow: "0 0 20px rgba(255,0,255,0.8)",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 10,
        },
    },
};

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        setMessage(null);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setMessage("Please enter a valid email address!");
            setMessageType("error");
            return;
        }

        setTimeout(() => {
            setMessage(`Thank you for subscribing, ${email}! You'll receive the latest updates.`);
            setMessageType("success");
            setEmail("");
        }, 500);
    };

    return (
        <div className="flex justify-center px-4 py-10 bg-gray-50">
            <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-blue-200 border-dashed shadow-xl flex flex-col items-center w-full max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#001931] mb-4 text-center">
                    Subscribe to our Newsletter
                </h2>
                <p className="text-gray-600 mb-8 text-center max-w-lg">
                    Get the latest updates on new games, trending apps, and exclusive offers delivered straight to your inbox.
                </p>

                <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg"
                >
                    <div className="relative w-full">
                        <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-lg"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="w-full sm:w-auto flex items-center justify-center font-extrabold text-white text-lg py-3 px-8 rounded-xl transition duration-300 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] border border-[#a020f0] shadow-[0_0_15px_rgba(138,43,226,0.6)]"
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                    >
                        Subscribe
                    </motion.button>
                </form>

                <AnimatePresence>
                    {message && (
                        <motion.p
                            className={`mt-6 p-3 rounded-lg font-medium w-full max-w-lg text-center ${messageType === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Newsletter;
