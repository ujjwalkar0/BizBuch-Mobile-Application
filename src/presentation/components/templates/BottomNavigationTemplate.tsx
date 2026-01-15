import React, { useMemo, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import { TabIcon } from '../atoms/TabIcon';
import { TAB_ROUTES } from '../../navigation/TabRoutes';
import { theme } from '../../theme';

const Tab = createBottomTabNavigator();
const { bottomNavigation } = theme.components;

/**
 * Configuration for hidden tab bar screens
 * Single Responsibility: Define which screens hide the tab bar
 * SOLID: Open/Closed - Easy to extend without modifying component
 */
const HIDDEN_TAB_BAR_SCREENS = [
  'ViewProfile',
  'EditProfile',
  'Chat',
  'ViewPost',
  'ActivityLog',
] as const;

/**
 * Tab bar style configuration
 * Single Responsibility: Compute tab bar visibility and styling
 */
const getTabBarStyle = (route: RouteProp<Record<string, object | undefined>>) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (routeName && HIDDEN_TAB_BAR_SCREENS.includes(routeName as typeof HIDDEN_TAB_BAR_SCREENS[number])) {
    return { display: 'none' as const };
  }

  return {
    backgroundColor: theme.colors.white,
    borderTopColor: theme.colors.border,
    paddingTop: bottomNavigation.paddingTop,
    paddingBottom: bottomNavigation.paddingBottom,
  };
};

/**
 * BottomNavigationTemplate Template
 * Atomic Design: Template - Page layout with bottom navigation
 * Single Responsibility: Configure and render bottom tab navigation
 * SOLID: Open/Closed - Tab routes defined externally in TAB_ROUTES
 * SOLID: Dependency Inversion - Uses TabIcon atom abstraction
 */
export const BottomNavigationTemplate: React.FC = () => {
  const getTabBarIcon = useCallback(
    (tabKey: string) =>
      ({ focused, color }: { focused: boolean; color: string }) => {
        const tab = TAB_ROUTES.find((r) => r.key === tabKey);
        const size = focused
          ? bottomNavigation.iconSizeFocused
          : bottomNavigation.iconSizeDefault;

        return <TabIcon icon={tab?.icon} color={color} size={size} />;
      },
    [],
  );

  const screenOptions = useMemo(
    () =>
      ({ route }: { route: RouteProp<Record<string, object | undefined>> }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray600,
        tabBarStyle: getTabBarStyle(route),
        tabBarLabelStyle: {
          fontSize: bottomNavigation.labelFontSize,
          fontWeight: bottomNavigation.labelFontWeight,
        },
        tabBarIcon: getTabBarIcon(route.name),
      }),
    [getTabBarIcon],
  );

  return (
    <Tab.Navigator screenOptions={screenOptions}>
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
};

export default BottomNavigationTemplate;
