import React, { useMemo } from 'react';
import { View, Text, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { theme } from '../../theme';

interface WorkExperienceCardProps {
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  location?: string;
  duration?: string;
  isLast?: boolean;
}

/**
 * WorkExperienceCard Molecule
 * Atomic Design: Molecule - Work experience item display
 * SOLID: Single Responsibility - Display single work experience
 */
export const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({
  jobTitle,
  companyName,
  companyLogo,
  location,
  duration,
  isLast = false,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      marginBottom: isLast ? 0 : 12,
      paddingBottom: isLast ? 0 : 12,
      borderBottomWidth: isLast ? 0 : 1,
      borderColor: theme.colors.border,
    }),
    [isLast],
  );

  const logoStyle = useMemo<ImageStyle>(
    () => ({
      width: 50,
      height: 50,
      borderRadius: 8,
      marginRight: 12,
      backgroundColor: theme.colors.gray100,
    }),
    [],
  );

  const infoContainerStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.gray900,
    }),
    [],
  );

  const companyStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 14,
      color: theme.colors.gray600,
      marginTop: 2,
    }),
    [],
  );

  const detailStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 13,
      color: theme.colors.gray500,
      marginTop: 4,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      {companyLogo && <Image source={{ uri: companyLogo }} style={logoStyle} />}
      <View style={infoContainerStyle}>
        <Text style={titleStyle}>{jobTitle}</Text>
        <Text style={companyStyle}>{companyName}</Text>
        {location && <Text style={detailStyle}>📍 {location}</Text>}
        {duration && <Text style={detailStyle}>{duration}</Text>}
      </View>
    </View>
  );
};
