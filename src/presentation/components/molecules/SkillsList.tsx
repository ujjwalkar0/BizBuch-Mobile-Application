import React, { useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface SkillBadgeProps {
  skill: string;
}

/**
 * SkillBadge Atom
 * Atomic Design: Atom - Single skill badge display
 * SOLID: Single Responsibility - Display one skill
 */
export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  const badgeStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: `${theme.colors.primary}15`,
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    }),
    [],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 13,
      color: theme.colors.primary,
      fontWeight: '500',
    }),
    [],
  );

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{skill}</Text>
    </View>
  );
};

interface SkillsListProps {
  skills: string[];
}

/**
 * SkillsList Molecule
 * Atomic Design: Molecule - Skills list display
 * SOLID: Single Responsibility - Display list of skills
 */
export const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    }),
    [],
  );

  if (!skills || skills.length === 0) return null;

  return (
    <View style={containerStyle}>
      {skills.map((skill, index) => (
        <SkillBadge key={`${skill}-${index}`} skill={skill} />
      ))}
    </View>
  );
};
