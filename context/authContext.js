import React, { createContext, useState, useEffect } from "react"; // 1. Corregido: useState (no userState)
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = async (token) => {
        setUserToken(token);
        await AsyncStorage.setItem('userToken', token); //
    };

    const logout = async () => { // 2. Agregado: Función para cerrar sesión
        setUserToken(null);
        await AsyncStorage.removeItem('userToken');
    };

    const isLoggedIn = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken'); //
            setUserToken(token);
        } catch (e) {
            console.log('Error en persistencia ');
        } finally {
            setIsLoading(false); // Se asegura de dejar de cargar pase lo que pase
        }
    };

    useEffect(() => {
        isLoggedIn(); // 3. Corregido: Llamar a la función isLoggedIn() (no a la variable isLoading)
    }, []);

    return (
        // 4. Corregido: Pasar las funciones y estados al Provider
        <AuthContext.Provider value={{ login, logout, userToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};