import React, { createContext, useContext, useState, useEffect } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { updateProfile } from "firebase/auth";


// ✅ Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCd2y5FgGIbuAvt5dGhsByBDLgBNThwoik",
    authDomain: "game-hub-cce2c.firebaseapp.com",
    projectId: "game-hub-cce2c",
    storageBucket: "game-hub-cce2c.firebasestorage.app",
    messagingSenderId: "655226987189",
    appId: "1:655226987189:web:dc5f4b74fd13b34b03d4fc"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Create Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// ✅ Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ✅ Keep user logged in on refresh
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                localStorage.setItem("user", JSON.stringify(currentUser));
            } else {
                setUser(null);
                localStorage.removeItem("user");
            }
        });
        return () => unsubscribe();
    }, []);


    // ✅ Register with email/password
    const register = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    // ✅ Login with email/password
    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    // ✅ Google Loginconst updateUserProfile
    const googleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    // ✅ Logout
    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };
    // ✅ Update user profile (name and photoURL)
    const updateUserProfile = async (name, photoURL) => {
        try {
            if (!auth.currentUser) throw new Error("No user logged in");

            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoURL,
            });

            // Update the local user state
            setUser({ ...auth.currentUser });

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, register, login, googleLogin, logout, updateUserProfile }}
        >
            {children}
        </AuthContext.Provider>
    );
};
