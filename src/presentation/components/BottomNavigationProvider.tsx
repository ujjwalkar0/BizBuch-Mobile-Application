import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { TabIcon } from '../components/TabIcon';
import { TAB_ROUTES } from '../navigation/TabRoutes';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();

// Screens where the tab bar should be hidden
const HIDDEN_TAB_BAR_SCREENS = ['ViewProfile', 'EditProfile', 'Chat', 'ViewPost'];

const getTabBarStyle = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  
  if (routeName && HIDDEN_TAB_BAR_SCREENS.includes(routeName)) {
    return { display: 'none' as const };
  }
  
  return {
    backgroundColor: theme.colors.white,
    borderTopColor: theme.colors.border,
    paddingTop: 4,
    paddingBottom: 4,
  };
};

export default function BottomNavigationProvider() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tab = TAB_ROUTES.find(r => r.key === route.name);

        return {
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.gray600,
          tabBarStyle: getTabBarStyle(route),
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon icon={tab?.icon} color={color} size={focused ? 26 : 22} />
          ),
        };
      }}
    >
      {TAB_ROUTES.map(tab => (
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
