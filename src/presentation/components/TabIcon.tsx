import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

type TabIconProps = {
  icon: any;
  color: string;
  size: number;
};

export const TabIcon: React.FC<TabIconProps> = ({ icon, color, size }) => {
  return <FontAwesomeIcon icon={icon} color={color} size={size} />;
};
