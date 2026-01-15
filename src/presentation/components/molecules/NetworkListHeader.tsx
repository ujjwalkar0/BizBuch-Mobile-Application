import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { ScreenHeader } from './ScreenHeader';
import { SearchInput } from './SearchInput';
import { TabBar } from './TabBar';
import { faUsers, faUserPlus, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';
import { Badge } from '../atoms/Badge';

const { networkListHeader } = theme.components;

interface NetworkListHeaderProps {
  connectedCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: 'suggestions' | 'connections';
  onTabChange: (tab: 'suggestions' | 'connections') => void;
}

const TABS = [
  { key: 'suggestions', label: 'Suggestions', icon: faUserPlus },
  { key: 'connections', label: 'My Network', icon: faUserCheck },
];

/**
 * NetworkListHeader Molecule
 * Atomic Design: Molecule - Composed of ScreenHeader + Badge + SearchInput + TabBar
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
  const badgeStyle = useMemo<ViewStyle>(
    () => ({ marginBottom: networkListHeader.badgeMarginBottom }),
    [],
  );

  const searchStyle = useMemo<ViewStyle>(
    () => ({ marginBottom: networkListHeader.searchMarginBottom }),
    [],
  );

  const tabsStyle = useMemo<ViewStyle>(
    () => ({ marginTop: networkListHeader.tabsMarginTop }),
    [],
  );

  return (
    <ScreenHeader title="Network">
      <Badge
        icon={faUsers}
        text={`${connectedCount} connections`}
        style={badgeStyle}
      />
      <SearchInput
        value={searchQuery}
        onChangeText={onSearchChange}
        placeholder="Search connections..."
        style={searchStyle}
      />
      <TabBar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={(key) => onTabChange(key as 'suggestions' | 'connections')}
        style={tabsStyle}
      />
    </ScreenHeader>
  );
};
