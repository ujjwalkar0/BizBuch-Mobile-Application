import React, { useMemo } from 'react';
import { View, Text, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { theme } from '../../theme';

interface EducationCardProps {
  schoolName: string;
  degree?: string;
  schoolLogo?: string;
  duration?: string;
  isLast?: boolean;
}

/**
 * EducationCard Molecule
 * Atomic Design: Molecule - Education item display
 * SOLID: Single Responsibility - Display single education entry
 */
export const EducationCard: React.FC<EducationCardProps> = ({
  schoolName,
  degree,
  schoolLogo,
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

  const schoolStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.gray900,
    }),
    [],
  );

  const degreeStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 14,
      color: theme.colors.gray600,
      marginTop: 2,
    }),
    [],
  );

  const durationStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 13,
      color: theme.colors.gray500,
      marginTop: 4,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      {schoolLogo && <Image source={{ uri: schoolLogo }} style={logoStyle} />}
      <View style={infoContainerStyle}>
        <Text style={schoolStyle}>{schoolName}</Text>
        {degree && <Text style={degreeStyle}>{degree}</Text>}
        {duration && <Text style={durationStyle}>{duration}</Text>}
      </View>
    </View>
  );
};
