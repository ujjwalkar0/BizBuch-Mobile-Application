import React from 'react';
import { BannerContainer } from '../molecules/BannerContainer';
import { BannerSpinner } from '../atoms/BannerSpinner';
import { BannerText } from '../atoms/BannerText';
import { theme } from '../../theme';

interface ConnectingBannerProps {
  message: string;
}

/**
 * ConnectingBanner Organism
 * Atomic Design: Organism - Composed of BannerContainer + BannerSpinner + BannerText
 * SOLID: Single Responsibility - Display connecting state only
 */
export const ConnectingBanner: React.FC<ConnectingBannerProps> = ({
  message,
}) => {
  return (
    <BannerContainer
      backgroundColor={theme.colors.primary}
      style={{ justifyContent: 'center' }}
    >
      <BannerSpinner />
      <BannerText>{message}</BannerText>
    </BannerContainer>
  );
};
