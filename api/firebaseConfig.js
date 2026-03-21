import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Reemplaza estos datos con los que aparecen en tu consola de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "miapp-e1ac0.firebaseapp.com",
  projectId: "miapp-e1ac0",
  storageBucket: "miapp-e1ac0.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicialización de la App
const app = initializeApp(firebaseConfig);

// Inicialización de Auth con persistencia para React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});