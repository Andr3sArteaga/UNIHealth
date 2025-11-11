import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
      <Tabs.Screen name="Inicio" component={HomeScreen} />
      <Tabs.Screen name="Citas" component={AppointmentsScreen} />
      <Tabs.Screen name="Diario" component={DiaryScreen} />
      <Tabs.Screen name="Perfil" component={ProfileScreen} />
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
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : !hasCompletedTutorial ? (
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Alerts" component={AlertsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
