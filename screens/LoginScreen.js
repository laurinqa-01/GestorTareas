import React, { useState, useContext } from "react";
import { View, TextInput, StyleSheet, Text, ActivityIndicator, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { AuthContext } from "../context/authContext";
// Ruta verificada: subes un nivel y entras a la carpeta api
import { loginService } from "../api/apiService"; 

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!email || !password) return Alert.alert("Oops ✨", "Por favor, completa todos los campos");

        setLoading(true);
        try {
            const data = await loginService(email, password);
            login(data.token); 
        } catch (e) {
            Alert.alert("Error de acceso", e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headerSection}>
                    <Text style={styles.emoji}>🌸</Text>
                    <Text style={styles.title}>Bienvenida</Text>
                    <Text style={styles.subtitle}>Gestor de Tareas Personal</Text>
                </View>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Correo Electrónico"
                        placeholderTextColor="#A88B92"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="#A88B92"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {loading ? (
                        <ActivityIndicator size="large" color="#D47384" style={{ marginTop: 20 }} />
                    ) : (
                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Ingresar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFF5F7' 
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 50,
    },
    emoji: {
        fontSize: 50,
        marginBottom: 10,
    },
    title: { 
        fontSize: 34, 
        fontWeight: "700", 
        color: '#D47384', 
        letterSpacing: -1 
    },
    subtitle: {
        fontSize: 16,
        color: '#A88B92',
        marginTop: 5,
    },
    form: {
        backgroundColor: '#FFFFFF',
        padding: 25,
        borderRadius: 30,
        elevation: 10,
        shadowColor: '#D47384',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    input: { 
        backgroundColor: '#FDF8F9',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        color: '#705D61',
        fontSize: 15,
    },
    loginButton: {
        backgroundColor: '#D47384',
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '600',
    }
});

export default LoginScreen;