import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerContainer } from '../molecules/BannerContainer';
import { BannerText } from '../atoms/BannerText';
import { BannerActions } from '../molecules/BannerActions';
import { BannerAction } from '../../../ui/services/BannerStateResolverService';
import { theme } from '../../theme';

interface ErrorBannerProps {
  message: string;
  subMessage?: string;
  actions: BannerAction[];
}

/**
 * ErrorBanner Organism
 * Atomic Design: Organism - Composed of BannerContainer + BannerText + BannerActions
 * SOLID: Single Responsibility - Display error state only
 */
export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  subMessage,
  actions,
}) => {
  return (
    <BannerContainer
      backgroundColor={theme.colors.red500}
      style={styles.container}
    >
      <View style={styles.content}>
        <BannerText>{message}</BannerText>
        {subMessage && <BannerText variant="secondary">{subMessage}</BannerText>}
      </View>
      <BannerActions actions={actions} />
    </BannerContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
});
