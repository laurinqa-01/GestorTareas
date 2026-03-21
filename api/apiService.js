import AsyncStorage from '@react-native-async-storage/async-storage';

// BASE_URL verificado con tu IP actual
const BASE_URL = "http://10.3.146.24:8000/api"; 

export const loginService = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login/`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Esto ayudará a mostrar mensajes lindos en el Login si algo falla
            throw new Error(data.error || 'Credenciales incorrectas, intenta de nuevo ✨');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const taskApiService = {
    // Listar tareas (Get)
    getAll: (token) => fetch(`${BASE_URL}/tareas/`, {
        headers: {
            'Authorization': `Bearer ${token}` // Espacio verificado
        }
    }).then(res => res.json()),

    // Crear nueva tarea (Post)
    create: (token, data) => fetch(`${BASE_URL}/tareas/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()),

    // Editar tarea (Put)
    update: (token, id, data) => fetch(`${BASE_URL}/tareas/${id}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()),

    // Eliminar tarea (Delete)
    delete: (token, id) => fetch(`${BASE_URL}/tareas/${id}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
};