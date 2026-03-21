import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../context/authContext';
import { taskApiService } from '../api/apiService';

const TaskScreen = () => {
    const { userToken } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Cargar tareas desde el servidor
    const loadTasks = async () => {
        try {
            const data = await taskApiService.getAll(userToken);
            setTasks(data);
        } catch (error) {
            Alert.alert("Error ✨", "No pudimos traer tus tareas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    // 2. Función para eliminar
    const handleDelete = async (id) => {
        try {
            await taskApiService.delete(userToken, id);
            setTasks(tasks.filter(t => t.id !== id)); // Actualiza la lista visualmente
        } catch (error) {
            Alert.alert("Error", "No se pudo eliminar la tarea");
        }
    };

    const renderTask = ({ item }) => (
        <View style={styles.taskCard}>
            <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{item.titulo || item.title}</Text>
                <Text style={styles.taskDesc}>{item.descripcion || "Sin descripción ✨"}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Mis Pendientes 🌸</Text>
            
            {loading ? (
                <ActivityIndicator size="large" color="#D47384" style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderTask}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>¡Todo listo! No tienes tareas pendientes ✨</Text>
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF5F7', paddingHorizontal: 20 },
    headerTitle: { 
        fontSize: 28, 
        fontWeight: 'bold', 
        color: '#D47384', 
        marginTop: 60, 
        marginBottom: 20,
        textAlign: 'center'
    },
    listContent: { paddingBottom: 20 },
    taskCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        elevation: 4,
        shadowColor: '#D47384',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    taskInfo: { flex: 1 },
    taskTitle: { fontSize: 18, fontWeight: '600', color: '#705D61' },
    taskDesc: { fontSize: 14, color: '#A88B92', marginTop: 4 },
    deleteIcon: { fontSize: 22 },
    emptyText: { textAlign: 'center', marginTop: 50, color: '#A88B92', fontSize: 16 }
});

export default TaskScreen;