import { WebSocketConnectionError } from '../../hooks/useChatWebSocket';
import { BannerAction, ResolvedBannerState } from '../BannerStateResolverService';

/**
 * IErrorStateResolver Interface
 * SOLID: Interface Segregation - Focused contract for error resolution
 * SOLID: Dependency Inversion - Abstract interface for error handling
 */
export interface IErrorStateResolver {
  canHandle(error: WebSocketConnectionError): boolean;
  resolve(
    error: WebSocketConnectionError,
    onRetry: () => void,
    onGoBack: () => void,
  ): ResolvedBannerState;
}
