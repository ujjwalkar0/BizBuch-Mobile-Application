import React, { useMemo, useState } from 'react';
import { View, ViewStyle, TouchableOpacity, Text, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PageHeader } from './PageHeader';
import { SearchInput } from './SearchInput';
import { theme } from '../../theme';

const { notificationTabs } = theme.components;

interface NetworkListHeaderProps {
  connectedCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: 'suggestions' | 'connections';
  onTabChange: (tab: 'suggestions' | 'connections') => void;
}

const TABS: { key: 'suggestions' | 'connections'; label: string }[] = [
  { key: 'suggestions', label: 'Suggestions' },
  { key: 'connections', label: 'My Network' },
];

/**
 * NetworkListHeader Molecule
 * Atomic Design: Molecule - Composed of PageHeader + Tabs + Badge + SearchInput
 * SOLID: Single Responsibility - Network list header UI only
 * SOLID: Open/Closed - Styles from theme
 */
export const NetworkListHeader: React.FC<NetworkListHeaderProps> = ({
  connectedCount,
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.white,
    }),
    [],
  );

  const tabsContainerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: notificationTabs.paddingHorizontal,
      paddingVertical: notificationTabs.paddingVertical,
      backgroundColor: theme.colors.white,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    }),
    [],
  );

  const tabsRowStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
    }),
    [],
  );

  const searchIconStyle = useMemo<ViewStyle>(
    () => ({
      padding: 8,
    }),
    [],
  );

  const searchContainerStyle = useMemo<ViewStyle>(
    () => ({
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.white,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    }),
    [],
  );

  const handleSearchToggle = () => {
    if (isSearchVisible) {
      onSearchChange('');
    }
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <View style={containerStyle}>
      <PageHeader title="Network" />
      <View style={tabsContainerStyle}>
        <View style={tabsRowStyle}>
          {TABS.map((tab) => (
            <NetworkTabButton
              key={tab.key}
              label={tab.key === 'connections' ? `${tab.label} (${connectedCount})` : tab.label}
              isActive={activeTab === tab.key}
              onPress={() => onTabChange(tab.key)}
            />
          ))}
        </View>
        <TouchableOpacity onPress={handleSearchToggle} style={searchIconStyle}>
          <FontAwesomeIcon
            icon={isSearchVisible ? faTimes : faSearch}
            size={18}
            color={isSearchVisible ? theme.colors.gray600 : theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
      {isSearchVisible && (
        <View style={searchContainerStyle}>
          <SearchInput
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Search connections..."
          />
        </View>
      )}
    </View>
  );
};

interface NetworkTabButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const NetworkTabButton: React.FC<NetworkTabButtonProps> = ({ label, isActive, onPress }) => {
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
