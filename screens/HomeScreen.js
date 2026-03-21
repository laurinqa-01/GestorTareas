import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { AuthContext } from "../context/authContext";

// Recibimos las funciones de navegación manual desde App.js
const HomeScreen = ({ goToTasks, goToDashboard }) => {
    const { logout } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.welcome}>¡Hola, Laura!</Text>
                    <Text style={styles.sub}>¿Qué vamos a crear hoy?</Text>
                </View>

                <View style={styles.menuGrid}>
                    {/* Botón de Tareas - CRUD */}
                    <TouchableOpacity 
                        style={styles.card} 
                        onPress={goToTasks}
                    >
                        <View style={[styles.iconCircle, { backgroundColor: '#FFB6C1' }]}>
                            <Text style={styles.cardIcon}>🌸</Text>
                        </View>
                        <Text style={styles.cardText}>Mis Tareas</Text>
                    </TouchableOpacity>

                    {/* Botón de Dashboard - REQUISITO PIZARRA */}
                    <TouchableOpacity 
                        style={styles.card} 
                        onPress={goToDashboard}
                    >
                        <View style={[styles.iconCircle, { backgroundColor: '#D47384' }]}>
                            <Text style={styles.cardIcon}>📊</Text>
                        </View>
                        <Text style={styles.cardText}>Dashboard</Text>
                    </TouchableOpacity>
                </View>

                {/* Botón de Salir - REQUISITO PIZARRA */}
                <TouchableOpacity 
                    style={styles.logoutButton} 
                    onPress={logout}
                >
                    <Text style={styles.logoutText}>Cerrar Sesión ✨</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF5F7' },
    content: { padding: 25 },
    header: { marginTop: 40, marginBottom: 40 },
    welcome: { fontSize: 32, fontWeight: '700', color: '#D47384', letterSpacing: -0.5 },
    sub: { fontSize: 18, color: '#A88B92', marginTop: 5, fontWeight: '400' },
    menuGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    card: { 
        backgroundColor: '#ffffff', 
        width: '47%', 
        paddingVertical: 30,
        borderRadius: 25, 
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#D47384',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
    },
    iconCircle: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    cardIcon: { fontSize: 30 },
    cardText: { fontSize: 15, fontWeight: '600', color: '#705D61', textAlign: 'center' },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#FFE4E1',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center'
    },
    logoutText: { color: '#D47384', fontWeight: '700', fontSize: 16 }
});

export default HomeScreen;