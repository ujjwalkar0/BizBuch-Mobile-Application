import { WebSocketConnectionError } from '../../hooks/useChatWebSocket';
import { ResolvedBannerState } from '../BannerStateResolverService';
import { IErrorStateResolver } from '../interfaces/IErrorStateResolver';
import { BannerMessages } from '../constants/BannerMessages';

/**
 * ConnectionErrorResolver
 * SOLID: Single Responsibility - Handles connection/retry errors only
 * SOLID: Open/Closed - Implements IErrorStateResolver interface
 */
export class ConnectionErrorResolver implements IErrorStateResolver {
  private readonly connectionCodes = [
    'MAX_RETRIES_EXCEEDED',
    'CONNECTION_ERROR',
  ] as const;

  canHandle(error: WebSocketConnectionError): boolean {
    return this.connectionCodes.includes(
      error.code as (typeof this.connectionCodes)[number],
    );
  }

  resolve(
    error: WebSocketConnectionError,
    onRetry: () => void,
    _onGoBack: () => void,
  ): ResolvedBannerState {
    return {
      state: 'error',
      message: error.message,
      actions: [{ label: BannerMessages.actions.retry, onPress: onRetry }],
    };
  }
}
