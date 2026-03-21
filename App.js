import React, { useContext } from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import { AuthProvider, AuthContext } from './context/authContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

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
        <ActivityIndicator size="large" color="#D47384" />
      </View>
    );
  }

  // Selección automática de pantalla basada en el estado del token
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