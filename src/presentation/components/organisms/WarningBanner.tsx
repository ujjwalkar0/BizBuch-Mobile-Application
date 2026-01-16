import React from 'react';
import { BannerContainer } from '../molecules/BannerContainer';
import { BannerText } from '../atoms/BannerText';

interface WarningBannerProps {
  message: string;
}

/**
 * WarningBanner Organism
 * Atomic Design: Organism - Composed of BannerContainer + BannerText
 * SOLID: Single Responsibility - Display warning state only
 */
export const WarningBanner: React.FC<WarningBannerProps> = ({ message }) => {
  return (
    <BannerContainer
      backgroundColor="#f59e0b"
      style={{ justifyContent: 'center' }}
    >
      <BannerText>{message}</BannerText>
    </BannerContainer>
  );
};
