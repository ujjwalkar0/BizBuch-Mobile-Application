import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

const { pageHeader } = theme.components;

type LeftAction = 
  | { type: 'back'; onPress: () => void }
  | { type: 'close'; onPress: () => void }
  | { type: 'custom'; render: () => React.ReactNode };

type RightAction =
  | { type: 'text'; label: string; onPress: () => void; disabled?: boolean; loading?: boolean }
  | { type: 'icon'; icon: any; onPress: () => void; color?: string }
  | { type: 'custom'; render: () => React.ReactNode };

interface PageHeaderProps {
  title: string;
  leftAction?: LeftAction;
  rightAction?: RightAction;
}

/**
 * PageHeader Molecule
 * Atomic Design: Molecule - Unified header for all screens
 * Single Responsibility: Display consistent page header with optional actions
 * SOLID: Open/Closed - Extensible via left/right action props, styles from theme
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  leftAction,
  rightAction,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      height: pageHeader.height,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: pageHeader.paddingHorizontal,
      backgroundColor: theme.colors.white,
      borderBottomWidth: pageHeader.borderBottomWidth,
      borderBottomColor: theme.colors.border,
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: pageHeader.titleFontSize,
      fontWeight: pageHeader.titleFontWeight,
      color: theme.colors.gray900,
    }),
    [],
  );

  const actionContainerStyle = useMemo<ViewStyle>(
    () => ({
      minWidth: pageHeader.actionMinWidth,
      alignItems: 'flex-start',
    }),
    [],
  );

  const rightActionContainerStyle = useMemo<ViewStyle>(
    () => ({
      minWidth: pageHeader.actionMinWidth,
      alignItems: 'flex-end',
    }),
    [],
  );

  const backButtonStyle = useMemo<ViewStyle>(
    () => ({
      padding: pageHeader.actionPadding,
    }),
    [],
  );

  const textButtonStyle = useMemo<TextStyle>(
    () => ({
      fontSize: pageHeader.actionFontSize,
      fontWeight: pageHeader.actionFontWeight,
      color: theme.colors.primary,
    }),
    [],
  );

  const disabledTextStyle = useMemo<TextStyle>(
    () => ({
      color: theme.colors.gray400,
    }),
    [],
  );

  const renderLeftAction = () => {
    if (!leftAction) return <View style={actionContainerStyle} />;

    if (leftAction.type === 'custom') {
      return <View style={actionContainerStyle}>{leftAction.render()}</View>;
    }

    const icon = leftAction.type === 'back' ? faArrowLeft : faTimes;
    
    return (
      <View style={actionContainerStyle}>
        <TouchableOpacity onPress={leftAction.onPress} style={backButtonStyle}>
          <FontAwesomeIcon
            icon={icon}
            size={pageHeader.iconSize}
            color={theme.colors.gray700}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderRightAction = () => {
    if (!rightAction) return <View style={rightActionContainerStyle} />;

    if (rightAction.type === 'custom') {
      return <View style={rightActionContainerStyle}>{rightAction.render()}</View>;
    }

    if (rightAction.type === 'icon') {
      return (
        <View style={rightActionContainerStyle}>
          <TouchableOpacity onPress={rightAction.onPress} style={backButtonStyle}>
            <FontAwesomeIcon
              icon={rightAction.icon}
              size={pageHeader.iconSize}
              color={rightAction.color || theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      );
    }

    // Text button
    const isDisabled = rightAction.disabled || rightAction.loading;
    
    return (
      <View style={rightActionContainerStyle}>
        <TouchableOpacity
          onPress={rightAction.onPress}
          disabled={isDisabled}
          style={backButtonStyle}
        >
          {rightAction.loading ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : (
            <Text style={[textButtonStyle, isDisabled && disabledTextStyle]}>
              {rightAction.label}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={containerStyle}>
      {renderLeftAction()}
      <Text style={titleStyle}>{title}</Text>
      {renderRightAction()}
    </View>
  );
};
