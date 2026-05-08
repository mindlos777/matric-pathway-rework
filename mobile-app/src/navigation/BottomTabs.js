import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Screens
import DashboardScreen from "../screens/DashboardScreen";
import CoursesScreen from "../screens/CoursesScreen";
import UniversitiesScreen from "../screens/UniversitiesScreen";
import BursariesScreen from "../screens/BursariesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WebViewScreen from "../screens/WebViewScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";

// Chatbot
import FloatingChatbot from "../components/FloatingChatbot";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// ---------------- TAB NAVIGATOR ----------------
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#888",

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
          borderTopWidth: 1,
          borderTopColor: "#eee",
          backgroundColor: "#fff",
        },

        tabBarIcon: ({ focused, color }) => {
          let iconName;

          switch (route.name) {
            case "Dashboard":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Courses":
              iconName = focused ? "book" : "book-outline";
              break;
            case "Universities":
              iconName = focused ? "school" : "school-outline";
              break;
            case "Bursaries":
              iconName = focused ? "cash" : "cash-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Universities" component={UniversitiesScreen} />
      <Tab.Screen name="Bursaries" component={BursariesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}


// ---------------- ROOT STACK ----------------
export default function BottomTabs() {
  return (
    <View style={{ flex: 1 }}>

      {/* NAVIGATION */}
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Tabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
          options={{
            title: "Application Page",
            headerBackTitle: "Back",
          }}
        />

        <Stack.Screen name="Settings" component={SettingsScreen} />

        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            title: "Notifications",
          }}
        />
      </Stack.Navigator>

      {/*FLOATING CHATBOT (GLOBAL) */}
      <FloatingChatbot />

    </View>
  );
}