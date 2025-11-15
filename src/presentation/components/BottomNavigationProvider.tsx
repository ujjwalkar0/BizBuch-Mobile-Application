import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabIcon } from "../components/TabIcon";
import { TAB_ROUTES } from "../navigation/TabRoutes";

const Tab = createBottomTabNavigator();

export default function BottomNavigationProvider() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tab = TAB_ROUTES.find(r => r.key === route.name);

        return {
          headerShown: false,
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",

          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon 
              icon={tab?.icon} 
              color={color} 
              size={focused ? 28 : 22} 
            />
          ),
        };
      }}
    >
      {TAB_ROUTES.map((tab) => (
        <Tab.Screen
          key={tab.key}
          name={tab.key}
          component={tab.component}
          options={{ title: tab.title }}
        />
      ))}
    </Tab.Navigator>
  );
}
