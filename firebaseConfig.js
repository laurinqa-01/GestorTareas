import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYPUlqXdUtbYW868pVTGvN5UfybbJpk-w",
  authDomain: "miapp-e1ac0.firebaseapp.com",
  projectId: "miapp-e1ac0",
  storageBucket: "miapp-e1ac0.firebasestorage.app",
  messagingSenderId: "117611646507",
  appId: "1:117611646507:web:b0c799830361a3ba7ea46e"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos los servicios para usarlos en toda la app
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;