import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import WelcomeScreen from "@screens/WelcomeScreen";
import LoginScreen from "@screens/auth/LoginScreen";
import RegisterScreen from "@screens/auth/RegisterScreen";
import TutorialScreen from "@screens/TutorialScreen";
import HomeScreen from "@screens/HomeScreen";
import AlertsScreen from "@screens/AlertsScreen";
import AppointmentsScreen from "@screens/AppointmentsScreen";
import DiaryScreen from "@screens/DiaryScreen";
import ProfileScreen from "@screens/ProfileScreen";
import { useAuth } from "@context/AuthContext";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Inicio" component={HomeScreen} 
        options={{ 
          tabBarLabel: "Inicio",
          tabBarIcon: () => <Text>🏠</Text>
        }} 
      />
      <Tabs.Screen name="AppointmentsScreen" component={AppointmentsScreen}
        options={{ 
          tabBarLabel: "Citas",
          tabBarIcon: () => <Text>📅</Text>
        }} 
      />
      <Tabs.Screen name="DiaryScreen" component={DiaryScreen}
        options={{ 
          tabBarLabel: "Diario",
          tabBarIcon: () => <Text>📝</Text>
        }} 
      />
      <Tabs.Screen name="ProfileScreen" component={ProfileScreen}
        options={{ 
          tabBarLabel: "Perfil",
          tabBarIcon: () => <Text>👤</Text>
        }} 
      />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  const { user } = useAuth();
  const isAuth = !!user?.token;
  const hasCompletedTutorial = user?.hasCompletedTutorial ?? true; // Default to true for existing users

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuth ? (
        <>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      ) : !hasCompletedTutorial ? (
        <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="AlertScreen" component={AlertsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
