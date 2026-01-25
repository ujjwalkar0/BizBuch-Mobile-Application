import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface ProfileStatsRowProps {
  connectionsCount: number;
  followersCount: number;
  postsCount: number;
}

/**
 * ProfileStatsRow Molecule
 * Atomic Design: Molecule - Profile statistics display
 * SOLID: Single Responsibility - Display connections, followers, posts counts
 */
export const ProfileStatsRow: React.FC<ProfileStatsRowProps> = ({
  connectionsCount,
  followersCount,
  postsCount,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: 20,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: 16,
      marginHorizontal: -16,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.white,
    }),
    [],
  );

  const statBoxStyle = useMemo<ViewStyle>(
    () => ({
      alignItems: 'center',
      flex: 1,
    }),
    [],
  );

  const dividerStyle = useMemo<ViewStyle>(
    () => ({
      width: 1,
      height: 40,
      backgroundColor: theme.colors.gray200,
    }),
    [],
  );

  const numberStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 22,
      fontWeight: '700',
      color: theme.colors.gray900,
    }),
    [],
  );

  const labelStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 13,
      color: theme.colors.gray500,
      marginTop: 4,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      <View style={statBoxStyle}>
        <Text style={numberStyle}>{connectionsCount}</Text>
        <Text style={labelStyle}>Connections</Text>
      </View>
      <View style={dividerStyle} />
      <View style={statBoxStyle}>
        <Text style={numberStyle}>{followersCount}</Text>
        <Text style={labelStyle}>Followers</Text>
      </View>
      <View style={dividerStyle} />
      <View style={statBoxStyle}>
        <Text style={numberStyle}>{postsCount}</Text>
        <Text style={labelStyle}>Posts</Text>
      </View>
    </View>
  );
};
