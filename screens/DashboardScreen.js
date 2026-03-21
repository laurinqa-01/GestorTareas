import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/authContext';

const DashboardScreen = ({ onBack }) => {
    const { userToken } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}>
                    <Text style={styles.backEmoji}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Mi Perfil 📊</Text>
                <View style={{ width: 30 }} /> 
            </View>

            <View style={styles.profileCard}>
                {/* Foto de Perfil - Requisito Pizarra */}
                <Image 
                    source={{ uri: 'https://ui-avatars.com/api/?name=Laura+User&background=D47384&color=fff&size=128' }} 
                    style={styles.avatar} 
                />
                <Text style={styles.userName}>Laura Dev 🌸</Text>
                <Text style={styles.userRole}>Software Student</Text>
                
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Token de Sesión:</Text>
                    <Text style={styles.tokenText} numberOfLines={2}>{userToken}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF5F7', padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, alignItems: 'center' },
    backEmoji: { fontSize: 28 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#D47384' },
    profileCard: { backgroundColor: '#fff', borderRadius: 30, padding: 30, marginTop: 30, alignItems: 'center', elevation: 5 },
    avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20, borderWhidth: 3, borderColor: '#D47384' },
    userName: { fontSize: 22, fontWeight: 'bold', color: '#705D61' },
    userRole: { fontSize: 16, color: '#A88B92', marginBottom: 20 },
    infoSection: { width: '100%', borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 20 },
    infoLabel: { fontSize: 14, fontWeight: 'bold', color: '#D47384' },
    tokenText: { fontSize: 12, color: '#A88B92', marginTop: 5 }
});

export default DashboardScreen;