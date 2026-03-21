import React, { useEffect, useState, useContext } from 'react';
import { 
    View, Text, FlatList, StyleSheet, TouchableOpacity, 
    ActivityIndicator, Alert, Modal, TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/authContext';
import { taskApiService } from '../api/apiService';

const TaskScreen = ({ onBack }) => {
    const { userToken } = useContext(AuthContext); 
    
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState({ id: null, titulo: '', descripcion: '' });

    const loadTasks = async () => {
        if (!userToken) return;
        setLoading(true);
        try {
            const data = await taskApiService.getAll(userToken);
            setTasks(data || []);
        } catch (error) {
            console.error(error);
            Alert.alert("Error ✨", "No pudimos sincronizar tus tareas.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadTasks(); }, [userToken]);

    const handleSave = async () => {
        if (!currentTask.titulo.trim()) {
            return Alert.alert("Ups 🌸", "El título es obligatorio.");
        }

        try {
            setLoading(true);
            if (currentTask.id) {
                await taskApiService.update(currentTask.id, {
                    titulo: currentTask.titulo,
                    descripcion: currentTask.descripcion
                });
            } else {
                await taskApiService.create(userToken, {
                    titulo: currentTask.titulo,
                    descripcion: currentTask.descripcion
                });
            }
            await loadTasks();
            closeModal();
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar en la nube.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Alert.alert("¿Eliminar tarea?", "Esta acción no se puede deshacer ✨", [
            { text: "Cancelar", style: "cancel" },
            { 
                text: "Sí, borrar", 
                style: "destructive",
                onPress: async () => {
                    try {
                        await taskApiService.delete(id);
                        setTasks(prev => prev.filter(t => t.id !== id));
                    } catch (error) {
                        Alert.alert("Error", "No se pudo eliminar de Firebase.");
                    }
                } 
            }
        ]);
    };

    const openModal = (task = { id: null, titulo: '', descripcion: '' }) => {
        setCurrentTask(task);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setCurrentTask({ id: null, titulo: '', descripcion: '' });
    };

    const renderTask = ({ item }) => (
        <View style={styles.taskCard}>
            <TouchableOpacity style={styles.taskInfo} onPress={() => openModal(item)}>
                <Text style={styles.taskTitle}>{item.titulo}</Text>
                <Text style={styles.taskDesc} numberOfLines={2}>
                    {item.descripcion || "Sin descripción ✨"}
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.deleteBtn} 
                onPress={() => handleDelete(item.id)}
            >
                <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backEmoji}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mis Pendientes 🌸</Text>
                <View style={{ width: 40 }} /> 
            </View>

            {loading && tasks.length === 0 ? (
                <ActivityIndicator size="large" color="#D47384" style={styles.loader} />
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id} 
                    renderItem={renderTask}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>¡Todo listo por hoy! ✨</Text>
                        </View>
                    }
                />
            )}

            <TouchableOpacity style={styles.fab} onPress={() => openModal()}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="fade" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {currentTask.id ? 'Editar Tarea' : 'Nueva Tarea'} 🌸
                        </Text>
                        
                        <TextInput 
                            style={styles.input} 
                            placeholder="¿Qué hay que hacer?" 
                            placeholderTextColor="#A88B92"
                            value={currentTask.titulo}
                            onChangeText={(txt) => setCurrentTask({...currentTask, titulo: txt})}
                        />
                        
                        <TextInput 
                            style={[styles.input, styles.textArea]} 
                            placeholder="Detalles adicionales..." 
                            placeholderTextColor="#A88B92"
                            multiline
                            value={currentTask.descripcion}
                            onChangeText={(txt) => setCurrentTask({...currentTask, descripcion: txt})}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.btnCancel} onPress={closeModal}>
                                <Text style={styles.btnTextCancel}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
                                <Text style={styles.btnTextSave}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#FFF5F6' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#FFF' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#D47384' },
    backButton: { padding: 5 },
    backEmoji: { fontSize: 24 },
    loader: { marginTop: 50 },
    listContent: { padding: 20, paddingBottom: 100 },
    taskCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 15, flexDirection: 'row', alignItems: 'center', elevation: 3 },
    taskInfo: { flex: 1 },
    taskTitle: { fontSize: 18, fontWeight: '600', color: '#5A4A4D' },
    taskDesc: { fontSize: 14, color: '#A88B92' },
    deleteBtn: { padding: 10 },
    deleteIcon: { fontSize: 20 },
    fab: { position: 'absolute', right: 30, bottom: 30, backgroundColor: '#D47384', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
    fabText: { color: '#FFF', fontSize: 35 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
    modalContent: { backgroundColor: '#FFF', borderRadius: 25, padding: 25 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#D47384', marginBottom: 20, textAlign: 'center' },
    input: { backgroundColor: '#F9F9F9', borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#EEE', color: '#5A4A4D' },
    textArea: { height: 100, textAlignVertical: 'top' },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
    btnSave: { backgroundColor: '#D47384', padding: 12, borderRadius: 12, flex: 1, marginLeft: 10 },
    btnCancel: { backgroundColor: '#EEE', padding: 12, borderRadius: 12, flex: 1, marginRight: 10 },
    btnTextSave: { color: '#FFF', fontWeight: 'bold', textAlign: 'center' },
    btnTextCancel: { color: '#5A4A4D', fontWeight: 'bold', textAlign: 'center' },
    emptyContainer: { alignItems: 'center', marginTop: 100 },
    emptyText: { color: '#A88B92', fontSize: 16 }
});

export default TaskScreen;