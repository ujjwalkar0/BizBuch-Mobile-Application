import { WebSocketConnectionError } from '../../hooks/useChatWebSocket';
import { ResolvedBannerState } from '../BannerStateResolverService';
import { IErrorStateResolver } from '../interfaces/IErrorStateResolver';

/**
 * DefaultErrorResolver
 * SOLID: Single Responsibility - Fallback for unhandled errors
 * SOLID: Liskov Substitution - Can be used in place of any IErrorStateResolver
 */
export class DefaultErrorResolver implements IErrorStateResolver {
  canHandle(_error: WebSocketConnectionError): boolean {
    return true; // Always handles as fallback
  }

  resolve(
    error: WebSocketConnectionError,
    _onRetry: () => void,
    _onGoBack: () => void,
  ): ResolvedBannerState {
    return {
      state: 'error',
      message: error.message,
      actions: [],
    };
  }
}
