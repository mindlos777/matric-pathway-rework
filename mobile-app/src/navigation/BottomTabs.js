import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigationState,
} from "@react-navigation/native";

// Screens
import DashboardScreen from "../screens/DashboardScreen";
import CoursesScreen from "../screens/CoursesScreen";
import UniversitiesScreen from "../screens/UniversitiesScreen";
import BursariesScreen from "../screens/BursariesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WebViewScreen from "../screens/WebViewScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import TemplatesScreen from "../screens/TemplatesScreen";
import CVTemplatesScreen from "../screens/CVTemplatesScreen";
import CVEditorScreen from "../screens/CVEditorScreen";
import EmailTemplatesScreen from "../screens/EmailTemplatesScreen";
import EmailEditorScreen from "../screens/EmailEditorScreen";

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
          borderTopColor: "#eeeeee",
          backgroundColor: "#ffffff6d",
          borderRadius: 50,
          marginBottom: 5,
        },

        tabBarIcon: ({ focused, color }) => {
          let iconName;

          switch (route.name) {
            case "Dashboard":
              iconName = focused
                ? "home"
                : "home-outline";
              break;

            case "Courses":
              iconName = focused
                ? "book"
                : "book-outline";
              break;

            case "Universities":
              iconName = focused
                ? "school"
                : "school-outline";
              break;

            case "Bursaries":
              iconName = focused
                ? "cash"
                : "cash-outline";
              break;

            case "Profile":
              iconName = focused
                ? "person"
                : "person-outline";
              break;

            default:
              iconName =
                "ellipse-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={22}
              color={color}
            />
      )},
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
  const routeName =
    useNavigationState((state) => {
      const route =
        state.routes[state.index];

      return route.name;
    });

  // HIDE CHATBOT
  const hideChatbotScreens = [
    "Settings",
    "Notifications",
    "CVTemplates",
    "EmailTemplates",
    "CVEditor",
    "EmailEditor",
    "WebView",
  ];

  return (
    <View style={{ flex: 1 }}>

      {/* NAVIGATION */}
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
          options={{
            headerShown: false,
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
        <Stack.Screen
          name="Templates"
          component={TemplatesScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CVTemplates"
          component={CVTemplatesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CVEditor"
          component={CVEditorScreen}
          options={{
            title: "Edit CV",
          }}
        />
        <Stack.Screen
          name="EmailTemplates"
          component={EmailTemplatesScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="EmailEditor"
          component={EmailEditorScreen}
          options={{
            title: "Email Editor",
          }}
        />
      </Stack.Navigator>

      {/*FLOATING CHATBOT (GLOBAL) */}
      {!hideChatbotScreens.includes(
        routeName
      ) && <FloatingChatbot />}

    </View>
    
  );
}