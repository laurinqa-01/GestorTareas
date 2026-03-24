import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { AuthContext } from '../context/authContext';
import * as ImagePicker from 'expo-image-picker';

const DashboardScreen = ({ onBack }) => {
    const { userToken, userImage, updateProfileImage } = useContext(AuthContext);

    const pickImage = async () => {
        // 1. Pedir permisos
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Necesitamos acceso a tu galería para cambiar la foto.');
            return;
        }

        // 2. Abrir el selector de imágenes
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Foto cuadrada
            quality: 0.8,
        });

        // 3. Si el usuario no canceló, actualizamos el contexto
        if (!result.canceled) {
            updateProfileImage(result.assets[0].uri);
        }
    };

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
                {/* Contenedor de imagen interactivo */}
                <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                    <View style={styles.avatarContainer}>
                        <Image 
                            source={{ uri: userImage }} 
                            style={styles.avatar} 
                        />
                        <View style={styles.editBadge}>
                            <Text style={{ fontSize: 12 }}>✏️</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <Text style={styles.userName}>Laura 🌸</Text>
                <Text style={styles.userRole}>estudiante</Text>
                
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>ID de Usuario (UID):</Text>
                    <Text style={styles.tokenText} numberOfLines={1}>{userToken}</Text>
                    
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.infoLabel}>Estado:</Text>
                        <Text style={styles.tokenText}>Sesión iniciada correctamente ✅</Text>
                    </View>
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
    profileCard: { 
        backgroundColor: '#fff', 
        borderRadius: 30, 
        padding: 30, 
        marginTop: 30, 
        alignItems: 'center', 
        elevation: 10,
        shadowColor: '#D47384',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10
    },
    avatarContainer: { position: 'relative', marginBottom: 20 },
    avatar: { 
        width: 130, 
        height: 130, 
        borderRadius: 65, 
        borderWidth: 4, 
        borderColor: '#D47384' 
    },
    editBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#fff',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0'
    },
    userName: { fontSize: 22, fontWeight: 'bold', color: '#705D61' },
    userRole: { fontSize: 16, color: '#A88B92', marginBottom: 25 },
    infoSection: { 
        width: '100%', 
        borderTopWidth: 1, 
        borderTopColor: '#F0F0F0', 
        paddingTop: 20 
    },
    infoLabel: { fontSize: 13, fontWeight: 'bold', color: '#D47384', textTransform: 'uppercase' },
    tokenText: { fontSize: 13, color: '#705D61', marginTop: 5, backgroundColor: '#F9F9F9', padding: 8, borderRadius: 8 }
});

export default DashboardScreen;