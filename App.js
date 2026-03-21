import React, { useContext, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, AuthContext } from './context/authContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import TaskScreen from './screens/TaskScreen';
import DashboardScreen from './screens/DashboardScreen'; // Nueva pantalla

const RootNavigation = () => {
  const { userToken, isLoading } = useContext(AuthContext);
  const [currentScreen, setCurrentScreen] = useState('Home');

  if (isLoading) return null; // O un ActivityIndicator

  if (!userToken) return <LoginScreen />;

  // Control de navegación manual para cumplir con el requisito de "Individual"
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