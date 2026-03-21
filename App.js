import React, { useContext, useState } from 'react';
import { ActivityIndicator, View } from 'react-native'; // Agregamos estos
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, AuthContext } from './context/authContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import TaskScreen from './screens/TaskScreen';
import DashboardScreen from './screens/DashboardScreen';

const RootNavigation = () => {
  const { userToken, isLoading } = useContext(AuthContext);
  const [currentScreen, setCurrentScreen] = useState('Home');

  // Si está cargando, mostramos un círculo de carga para que no parezca trabado
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF5F7' }}>
        <ActivityIndicator size="large" color="#D47384" />
      </View>
    );
  }

  // Si no hay token, mandamos al Login obligatoriamente
  if (!userToken) return <LoginScreen />;

  // Navegación manual
  switch (currentScreen) {
    case 'Tasks':
      return <TaskScreen onBack={() => setCurrentScreen('Home')} />;
    case 'Dashboard':
      return <DashboardScreen onBack={() => setCurrentScreen('Home')} />;
    default:
      return (
        <HomeScreen 
          goToTasks={() => setCurrentScreen('Tasks')} 
          goToDashboard={() => setCurrentScreen('Dashboard')} 
        />
      );
  }
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
}