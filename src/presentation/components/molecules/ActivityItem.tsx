import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { ActivityIcon } from '../atoms/ActivityIcon';
import { ActivityDescription } from '../atoms/ActivityDescription';
import { ActivityTimestamp } from '../atoms/ActivityTimestamp';
import { ActivityLog } from '../../../domain/activity/entities/ActivityLog';
import { ActivityLogFormatter } from '../../../data/services/ActivityLogFormatter';
import { theme } from '../../theme';

const { activityItem } = theme.components;

interface ActivityItemProps {
  activity: ActivityLog;
}

/**
 * ActivityItem Molecule
 * Atomic Design: Molecule - Composes ActivityIcon, ActivityDescription, ActivityTimestamp atoms
 * Single Responsibility: Display single activity entry
 * SOLID: Open/Closed - Styles from theme, formatting from service
 */
export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const displayInfo = useMemo(
    () => ActivityLogFormatter.getDisplayInfo(activity),
    [activity],
  );

  const formattedTime = useMemo(
    () => ActivityLogFormatter.formatTime(activity.created_at),
    [activity.created_at],
  );

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: activityItem.paddingVertical,
      paddingHorizontal: activityItem.paddingHorizontal,
      backgroundColor: theme.colors.white,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    }),
    [],
  );

  const contentStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      marginLeft: activityItem.contentMarginLeft,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <ActivityIcon icon={displayInfo.icon} color={displayInfo.color} />
      <View style={contentStyle}>
        <ActivityDescription text={displayInfo.description} />
        <ActivityTimestamp time={formattedTime} />
      </View>
    </View>
  );
};
