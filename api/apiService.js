import { db } from "./firebaseConfig";
import { 
    collection, addDoc, getDocs, query, where, 
    doc, updateDoc, deleteDoc, orderBy 
} from "firebase/firestore";

export const taskApiService = {
    // 1. OBTENER TAREAS (Filtradas por usuario y ordenadas por fecha)
    getAll: async (userId) => {
        try {
            const q = query(
                collection(db, "tareas"), 
                where("userId", "==", userId),
                orderBy("createdAt", "desc") // Las más nuevas aparecen arriba
            );
            const querySnapshot = await getDocs(q);
            const tasks = [];
            querySnapshot.forEach((doc) => {
                // EXTRACCIÓN CRÍTICA: Aquí asignamos el ID real de Firebase
                tasks.push({ id: doc.id, ...doc.data() }); 
            });
            return tasks;
        } catch (error) {
            console.error("Error en getAll:", error);
            throw error;
        }
    },

    // 2. CREAR TAREA
    create: async (userId, taskData) => {
        try {
            await addDoc(collection(db, "tareas"), {
                titulo: taskData.titulo,
                descripcion: taskData.descripcion,
                userId: userId, 
                createdAt: new Date(),
            });
        } catch (error) {
            console.error("Error en create:", error);
            throw error;
        }
    },

    // 3. ACTUALIZAR TAREA (Usa el ID del documento)
    update: async (taskId, updatedData) => {
        try {
            const taskRef = doc(db, "tareas", taskId);
            await updateDoc(taskRef, {
                titulo: updatedData.titulo,
                descripcion: updatedData.descripcion,
                updatedAt: new Date()
            });
        } catch (error) {
            console.error("Error en update:", error);
            throw error;
        }
    },

    // 4. ELIMINAR TAREA
    delete: async (taskId) => {
        try {
            const taskRef = doc(db, "tareas", taskId);
            await deleteDoc(taskRef);
        } catch (error) {
            console.error("Error en delete:", error);
            throw error;
        }
    }
};