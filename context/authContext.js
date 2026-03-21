import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../api/firebaseConfig"; // Importamos tu nueva config
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Escuchador de Firebase ✨
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                setUserToken(token);
                await AsyncStorage.setItem('userToken', token);
            } else {
                setUserToken(null);
                await AsyncStorage.removeItem('userToken');
            }
            setIsLoading(false);
        });

        return unsubscribe; // Limpia el escuchador
    }, []);

    const login = async (token) => {
        setUserToken(token);
        await AsyncStorage.setItem('userToken', token);
    };

    const logout = async () => {
        setUserToken(null);
        await AsyncStorage.removeItem('userToken');
        await auth.signOut(); // Cerramos sesión en Firebase también
    };

    return (
        <AuthContext.Provider value={{ login, logout, userToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};