import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import DashboardScreen from "../screens/DashboardScreen";
import CoursesScreen from "../screens/CoursesScreen";
import UniversitiesScreen from "../screens/UniversitiesScreen";
import BursariesScreen from "../screens/BursariesScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true, // keep top headers
        tabBarShowLabel: true,

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

        headerStyle: {
          backgroundColor: "#fff",
        },

        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 18,
        },

        tabBarIcon: ({ focused, color, size }) => {
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

          return (
            <Ionicons
              name={iconName}
              size={22}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
      />

      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
      />

      <Tab.Screen
        name="Universities"
        component={UniversitiesScreen}
      />

      <Tab.Screen
        name="Bursaries"
        component={BursariesScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}