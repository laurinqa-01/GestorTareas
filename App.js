import React, { useContext } from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import { AuthProvider, AuthContext } from './context/authContext'; // Cambiado: ./ porque está en la misma carpeta
import LoginScreen from './screens/LoginScreen';                // Cambiado: ./ porque está en la misma carpeta
import HomeScreen from './screens/HomeScreen';                  // Cambiado: ./ porque está en la misma carpeta

const RootNavigation = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#FFF5F7' 
      }}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" color="#FFB6C1" />
      </View>
    );
  }

  // Ahora sí te mandará a tu Home rosa si hay token
  return userToken ? <HomeScreen /> : <LoginScreen />; 
};

export default function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <RootNavigation />
    </AuthProvider>
  );
}