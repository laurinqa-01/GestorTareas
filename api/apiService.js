import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://10.3.146.24:8000/api"; // Sin espacios y con http://

export const loginService = async (email, password) => {
    try {
        // Corregido: Uso de backticks (`) para template literals y variable 'response'
        const response = await fetch(`${BASE_URL}/auth/login/`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        // Corregido: response (minúscula) es la instancia, Response (mayúscula) es la clase
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al iniciar sesión');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const taskApiService = {
    // Listar (get)
    getAll: (token) => fetch(`${BASE_URL}/tareas/`, {
        headers: {
            'Authorization': `Bearer ${token}` // Espacio agregado entre Bearer y el token
        }
    }).then(res => res.json()),

    // Crear
    create: (token, data) => fetch(`${BASE_URL}/tareas/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()),

    // Editar
    update: (token, id, data) => fetch(`${BASE_URL}/tareas/${id}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()),

    // Eliminar
    delete: (token, id) => fetch(`${BASE_URL}/tareas/${id}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}