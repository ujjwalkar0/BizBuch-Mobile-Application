import { WebSocketConnectionError } from '../hooks/useChatWebSocket';
import { BannerMessages } from './constants/BannerMessages';
import { IErrorStateResolver } from './interfaces/IErrorStateResolver';
import { AuthErrorResolver } from './resolvers/AuthErrorResolver';
import { ConnectionErrorResolver } from './resolvers/ConnectionErrorResolver';
import { DefaultErrorResolver } from './resolvers/DefaultErrorResolver';

export type BannerState = 'connecting' | 'error' | 'warning' | 'hidden';

export interface BannerAction {
  label: string;
  onPress: () => void;
}

export interface ResolvedBannerState {
  state: BannerState;
  message: string;
  subMessage?: string;
  actions: BannerAction[];
}

interface BannerStateResolverInput {
  isConnecting: boolean;
  isConnected: boolean;
  connectionError: WebSocketConnectionError | null;
  reconnectAttempts: number;
  onRetry: () => void;
  onGoBack: () => void;
}

/**
 * BannerStateResolverService
 * SOLID: Single Responsibility - Orchestrates state resolution
 * SOLID: Open/Closed - Add new resolvers without modifying this class
 * SOLID: Dependency Inversion - Depends on IErrorStateResolver interface
 * Pattern: Strategy - Delegates error resolution to specialized resolvers
 */
export class BannerStateResolverService {
  private static readonly errorResolvers: IErrorStateResolver[] = [
    new AuthErrorResolver(),
    new ConnectionErrorResolver(),
    new DefaultErrorResolver(), // Fallback - must be last
  ];

  static resolve(input: BannerStateResolverInput): ResolvedBannerState {
    const {
      isConnecting,
      isConnected,
      connectionError,
      reconnectAttempts,
      onRetry,
      onGoBack,
    } = input;

    // Connecting state
    if (isConnecting) {
      return this.resolveConnectingState(reconnectAttempts);
    }

    // Error state
    if (connectionError) {
      return this.resolveErrorState(connectionError, onRetry, onGoBack);
    }

    // Warning state (not connected but no error)
    if (!isConnected) {
      return this.resolveWarningState();
    }

    return { state: 'hidden', message: '', actions: [] };
  }

  private static resolveConnectingState(
    reconnectAttempts: number,
  ): ResolvedBannerState {
    return {
      state: 'connecting',
      message:
        reconnectAttempts > 0
          ? BannerMessages.connecting.reconnecting(reconnectAttempts)
          : BannerMessages.connecting.initial,
      actions: [],
    };
  }

  private static resolveWarningState(): ResolvedBannerState {
    return {
      state: 'warning',
      message: BannerMessages.warning.offline,
      actions: [],
    };
  }

  private static resolveErrorState(
    error: WebSocketConnectionError,
    onRetry: () => void,
    onGoBack: () => void,
  ): ResolvedBannerState {
    const resolver = this.errorResolvers.find(r => r.canHandle(error));
    return resolver!.resolve(error, onRetry, onGoBack);
  }
}
