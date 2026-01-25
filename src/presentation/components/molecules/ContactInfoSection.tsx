import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGlobe, faPhone, faLink } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { theme } from '../../theme';

interface ContactItem {
  type: 'website' | 'phone' | 'linkedin' | 'twitter';
  label: string;
  value: string;
}

interface ContactInfoSectionProps {
  items: ContactItem[];
  onItemPress?: (item: ContactItem) => void;
}

const iconMap: Record<ContactItem['type'], IconDefinition> = {
  website: faGlobe,
  phone: faPhone,
  linkedin: faLink,
  twitter: faLink,
};

/**
 * ContactInfoSection Molecule
 * Atomic Design: Molecule - Contact information display
 * SOLID: Single Responsibility - Display contact info items
 */
export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  items,
  onItemPress,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.white,
      marginBottom: 12,
      paddingHorizontal: 16,
      paddingVertical: 16,
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.gray900,
      marginBottom: 16,
    }),
    [],
  );

  const rowStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    }),
    [],
  );

  const iconContainerStyle = useMemo<ViewStyle>(
    () => ({
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: `${theme.colors.primary}15`,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [],
  );

  const infoContainerStyle = useMemo<ViewStyle>(
    () => ({
      marginLeft: 12,
      flex: 1,
    }),
    [],
  );

  const labelStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 12,
      color: theme.colors.gray500,
      marginBottom: 2,
    }),
    [],
  );

  const valueStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 14,
      color: theme.colors.gray700,
    }),
    [],
  );

  const linkStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 14,
      color: theme.colors.primary,
    }),
    [],
  );

  if (items.length === 0) return null;

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>Contact Information</Text>
      {items.map((item, index) => (
        <TouchableOpacity
          key={`${item.type}-${index}`}
          style={[rowStyle, index === items.length - 1 && { marginBottom: 0 }]}
          onPress={() => onItemPress?.(item)}
          disabled={!onItemPress}
          activeOpacity={onItemPress ? 0.7 : 1}
        >
          <View style={iconContainerStyle}>
            <FontAwesomeIcon icon={iconMap[item.type]} size={18} color={theme.colors.primary} />
          </View>
          <View style={infoContainerStyle}>
            <Text style={labelStyle}>{item.label}</Text>
            <Text style={item.type === 'phone' ? valueStyle : linkStyle}>
              {item.value}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
