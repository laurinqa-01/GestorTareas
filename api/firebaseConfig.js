import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYPUlqXdUtbYW868pVTGvN5UfybbJpk-w",
  authDomain: "miapp-e1ac0.firebaseapp.com",
  projectId: "miapp-e1ac0",
  storageBucket: "miapp-e1ac0.firebasestorage.app",
  messagingSenderId: "117611646507",
  appId: "1:117611646507:web:b0c799830361a3ba7ea46e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Exportación directa
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});