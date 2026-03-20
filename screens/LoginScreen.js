import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from "../context/authContext";
import { loginService } from "../api/apiService"; // Ajustado según tu nueva carpeta 'api'
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!email || !password) return Alert.alert("Error", "Completa todos los campos");

        setLoading(true);
        try {
            const data = await loginService(email, password);
            login(data.token); // Guardar el token en un estado global
        } catch (e) {
            Alert.alert("Error de login", e.message);
        } finally {
            setLoading(false);
        }
    };

   return (
        /* CORRECCIÓN: Cambiado 'Styles.container' por 'styles.container' (s minúscula) */
        <View style={styles.container}> 
            <Text style={styles.title}>
                ADSO Gestor de Tareas
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {loading ? (
                
                <ActivityIndicator size="large" color="#a9006b" />
            ) : (
                <Button title="Ingresar" onPress={handleLogin} color="#a9006e" />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: "bold", textAlign: 'center', marginBottom: 30, color: '#a9005a' },
    input: { borderBottomWidth: 1, borderColor: "#ccc", marginBottom: 20, padding: 10 }
});

export default LoginScreen;