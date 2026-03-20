import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from "../context/authContext";

const HomeScreen = ({ navigation }) => {
    const { logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcome}>
                    ¡Hola, desarrollador!
                </Text>
                <Text style={styles.sub}>
                    Bienvenido al panel principal
                </Text>
            </View>

            <View style={styles.menuGrid}>
                <TouchableOpacity 
                    style={styles.card} 
                    onPress={() => navigation.navigate('Tasks')}
                >
                    <Text style={styles.cardIcon}>📋</Text>
                    <Text style={styles.cardText}>Gestionar Tareas</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.card} 
                    onPress={logout}
                >
                    <Text style={styles.cardIcon}>🚪</Text>
                    <Text style={styles.cardText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
    header: { marginTop: 40, marginBottom: 30 },
    welcome: { fontSize: 26, fontWeight: 'bold', color: '#333' },
    sub: { fontSize: 16, color: '#666' },
    menuGrid: { flexDirection: 'row', justifyContent: 'space-between' },
    card: { 
        backgroundColor: '#fff', 
        width: '48%', 
        padding: 20, 
        borderRadius: 15, 
        alignItems: 'center',
        elevation: 3, // Sombra en Android
        shadowColor: '#000', // Sombra en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardIcon: { fontSize: 40, marginBottom: 10 },
    cardText: { fontSize: 14, fontWeight: '600', color: '#39A900', textAlign: 'center' }
});

export default HomeScreen;