import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, AuthContext } from './context/authContext'; // Ruta simplificada
import LoginScreen from './screens/LoginScreen';                // Ruta simplificada

const RootNavigation = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#39A900" />
      </View>
    );
  }

  // Si hay token muestra la App (puedes poner un texto temporal), si no el Login
  return userToken ? <View /> : <LoginScreen />; 
};

export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}