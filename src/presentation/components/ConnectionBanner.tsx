import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { theme } from '../theme';
import { WebSocketConnectionError } from '../../ui/hooks/useChatWebSocket';

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
 * Single Responsibility: Display connection status and errors
 */
export const ConnectionBanner: React.FC<ConnectionBannerProps> = ({
  isConnecting,
  isConnected,
  connectionError,
  reconnectAttempts,
  onRetry,
  onGoBack,
}) => {
  // Connecting state
  if (isConnecting) {
    return (
      <View style={styles.connectionBanner}>
        <ActivityIndicator
          size="small"
          color="#fff"
          style={styles.bannerIcon}
        />
        <Text style={styles.connectionBannerText}>
          {reconnectAttempts > 0
            ? `Reconnecting... (attempt ${reconnectAttempts}/5)`
            : 'Connecting...'}
        </Text>
      </View>
    );
  }

  // Error state
  if (connectionError) {
    const isAuthError =
      connectionError.code === 'UNAUTHORIZED' ||
      connectionError.code === 'FORBIDDEN';
    const canRetry =
      connectionError.code === 'MAX_RETRIES_EXCEEDED' ||
      connectionError.code === 'CONNECTION_ERROR';

    return (
      <View style={[styles.connectionBanner, styles.errorBanner]}>
        <View style={styles.bannerContent}>
          <Text style={styles.connectionBannerText}>
            {connectionError.message}
          </Text>
          {isAuthError && (
            <Text style={styles.connectionBannerSubtext}>
              {connectionError.code === 'UNAUTHORIZED'
                ? 'Please log in again to continue.'
                : 'You cannot access this conversation.'}
            </Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {canRetry && (
            <TouchableOpacity
              style={styles.retryButton}
              onPress={onRetry}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          )}
          {isAuthError && (
            <TouchableOpacity
              style={styles.retryButton}
              onPress={onGoBack}
            >
              <Text style={styles.retryButtonText}>Go Back</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  // Warning state (not connected but no error)
  if (!isConnected) {
    return (
      <View style={[styles.connectionBanner, styles.warningBanner]}>
        <Text style={styles.connectionBannerText}>
          Real-time updates unavailable. Messages will still be sent.
        </Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  connectionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  errorBanner: {
    backgroundColor: theme.colors.red500,
    justifyContent: 'space-between',
  },
  warningBanner: {
    backgroundColor: '#f59e0b',
  },
  bannerContent: {
    flex: 1,
  },
  bannerIcon: {
    marginRight: 8,
  },
  connectionBannerText: {
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  connectionBannerSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  retryButtonText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
