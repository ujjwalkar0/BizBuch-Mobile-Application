import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { NotificationTabType } from '../../../domain/notification/entities/Activity';
import { theme } from '../../theme';

const { notificationTabs } = theme.components;

interface NotificationTabsProps {
  activeTab: NotificationTabType;
  onTabChange: (tab: NotificationTabType) => void;
  unreadCount: number;
}

const TABS: { key: NotificationTabType; label: string; showCount?: boolean }[] = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread', showCount: true },
  { key: 'mentions', label: 'Mentions' },
];

/**
 * NotificationTabs Molecule
 * Atomic Design: Molecule - Tab navigation for notification filters
 * Single Responsibility: Manage notification tab selection
 * SOLID: Open/Closed - Styles from theme
 */
export const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeTab,
  onTabChange,
  unreadCount,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      paddingHorizontal: notificationTabs.paddingHorizontal,
      paddingVertical: notificationTabs.paddingVertical,
      backgroundColor: theme.colors.white,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      {TABS.map((tab) => (
        <TabButton
          key={tab.key}
          label={tab.showCount ? `${tab.label} (${unreadCount})` : tab.label}
          isActive={activeTab === tab.key}
          onPress={() => onTabChange(tab.key)}
        />
      ))}
    </View>
  );
};

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onPress }) => {
  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      paddingVertical: notificationTabs.tabPaddingVertical,
      paddingHorizontal: notificationTabs.tabPaddingHorizontal,
      marginRight: notificationTabs.tabMarginRight,
      borderRadius: notificationTabs.tabBorderRadius,
      backgroundColor: isActive
        ? notificationTabs.activeBackgroundColor
        : 'transparent',
    }),
    [isActive],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: notificationTabs.fontSize,
      fontWeight: isActive ? notificationTabs.activeFontWeight : 'normal',
      color: isActive ? theme.colors.primary : notificationTabs.inactiveColor,
    }),
    [isActive],
  );

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};
