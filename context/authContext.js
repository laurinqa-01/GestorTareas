import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../api/firebaseConfig"; // ✅ AGREGADAS LAS LLAVES
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserToken(user.uid); 
                await AsyncStorage.setItem('userToken', user.uid);
            } else {
                setUserToken(null);
                await AsyncStorage.removeItem('userToken');
            }
            setIsLoading(false);
        });
        return unsubscribe; 
    }, []);

    const login = async (uid) => {
        setUserToken(uid);
        await AsyncStorage.setItem('userToken', uid);
    };

    const logout = async () => {
        try {
            await auth.signOut();
            setUserToken(null);
            await AsyncStorage.removeItem('userToken');
        } catch (e) {
            console.log("Error al cerrar sesión:", e);
        }
    };

    return (
        <AuthContext.Provider value={{ login, logout, userToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};