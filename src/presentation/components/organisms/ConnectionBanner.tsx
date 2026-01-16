import React from 'react';
import { WebSocketConnectionError } from '../../../ui/hooks/useChatWebSocket';
import { BannerStateResolverService } from '../../../ui/services/BannerStateResolverService';
import { ConnectingBanner } from './ConnectingBanner';
import { ErrorBanner } from './ErrorBanner';
import { WarningBanner } from './WarningBanner';

interface ConnectionBannerProps {
  isConnecting: boolean;
  isConnected: boolean;
  connectionError: WebSocketConnectionError | null;
  reconnectAttempts: number;
  onRetry: () => void;
  onGoBack: () => void;
}

/**
 * ConnectionBanner Component
 * Atomic Design: Template - Orchestrates banner organisms based on state
 * SOLID: Single Responsibility - Banner state orchestration only
 * SOLID: Open/Closed - Extend by adding new banner types without modifying
 * SOLID: Dependency Inversion - Depends on BannerStateResolverService
 */
export const ConnectionBanner: React.FC<ConnectionBannerProps> = ({
  isConnecting,
  isConnected,
  connectionError,
  reconnectAttempts,
  onRetry,
  onGoBack,
}) => {
  const bannerState = BannerStateResolverService.resolve({
    isConnecting,
    isConnected,
    connectionError,
    reconnectAttempts,
    onRetry,
    onGoBack,
  });

  switch (bannerState.state) {
    case 'connecting':
      return <ConnectingBanner message={bannerState.message} />;

    case 'error':
      return (
        <ErrorBanner
          message={bannerState.message}
          subMessage={bannerState.subMessage}
          actions={bannerState.actions}
        />
      );

    case 'warning':
      return <WarningBanner message={bannerState.message} />;

    default:
      return null;
  }
};
