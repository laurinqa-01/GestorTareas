import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../api/firebaseConfig"; // Asegúrate de que use las llaves { }
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Escuchamos el cambio de estado de autenticación
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // ✅ CAMBIO CLAVE: Guardamos el UID (ej: Ze2Shk...), NO el token largo.
                const uid = user.uid;
                setUserToken(uid); 
                await AsyncStorage.setItem('userToken', uid);
                console.log("Sesión activa para el UID:", uid);
            } else {
                setUserToken(null);
                await AsyncStorage.removeItem('userToken');
                console.log("No hay sesión activa.");
            }
            setIsLoading(false);
        });

        return unsubscribe; // Limpiamos el listener al desmontar
    }, []);

    const login = async (uid) => {
        // Esta función la llamas desde tu pantalla de Login tras un auth exitoso
        setUserToken(uid);
        await AsyncStorage.setItem('userToken', uid);
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUserToken(null);
            await AsyncStorage.removeItem('userToken');
        } catch (e) {
            console.error("Error al cerrar sesión:", e);
        }
    };

    return (
        <AuthContext.Provider value={{ login, logout, userToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};