import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { AuthContext } from "../context/authContext";

const HomeScreen = ({ navigation }) => {
    const { logout } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.welcome}>¡Hola, Laura!</Text>
                    <Text style={styles.sub}>¿Qué vamos a crear hoy?</Text>
                </View>

                <View style={styles.menuGrid}>
                    <TouchableOpacity 
                        style={styles.card} 
                        onPress={() => navigation.navigate('Tasks')}
                    >
                        <View style={[styles.iconCircle, { backgroundColor: '#FFB6C1' }]}>
                            <Text style={styles.cardIcon}>🌸</Text>
                        </View>
                        <Text style={styles.cardText}>Mis Tareas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.card} 
                        onPress={logout}
                    >
                        <View style={[styles.iconCircle, { backgroundColor: '#FADADD' }]}>
                            <Text style={styles.cardIcon}>✨</Text>
                        </View>
                        <Text style={styles.cardText}>Salir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFF5F7' // Un fondo rosado casi blanco, muy elegante
    },
    content: {
        padding: 25,
    },
    header: { 
        marginTop: 40, 
        marginBottom: 40 
    },
    welcome: { 
        fontSize: 32, 
        fontWeight: '700', 
        color: '#D47384', // Rosa oscuro para el texto principal
        letterSpacing: -0.5 
    },
    sub: { 
        fontSize: 18, 
        color: '#A88B92', 
        marginTop: 5,
        fontWeight: '400'
    },
    menuGrid: { 
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    },
    card: { 
        backgroundColor: '#ffffff', 
        width: '47%', 
        paddingVertical: 30,
        borderRadius: 25, // Bordes mucho más redondeados
        alignItems: 'center',
        // Sombras más sutiles y elegantes
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
    cardIcon: { 
        fontSize: 30 
    },
    cardText: { 
        fontSize: 15, 
        fontWeight: '600', 
        color: '#705D61', 
        textAlign: 'center' 
    }
});

export default HomeScreen;