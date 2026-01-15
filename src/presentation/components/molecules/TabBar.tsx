import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { TabButton } from '../atoms/TabButton';
import { theme } from '../../theme';

const { tabBar } = theme.components;

interface Tab {
  key: string;
  label: string;
  icon?: IconDefinition;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  style?: ViewStyle;
}

/**
 * TabBar Molecule
 * Atomic Design: Molecule - Composes TabButton atoms
 * Single Responsibility: Manage tab navigation display
 * SOLID: Open/Closed - Extensible via props, styles from theme
 */
export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  style,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: tabBar.flexDirection,
      justifyContent: tabBar.justifyContent,
      ...((style as object) || {}),
    }),
    [style],
  );

  return (
    <View style={containerStyle}>
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          label={tab.label}
          icon={tab.icon}
          isActive={activeTab === tab.key}
          onPress={() => onTabChange(tab.key)}
        />
      ))}
    </View>
  );
};
