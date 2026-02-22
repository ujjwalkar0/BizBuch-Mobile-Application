import { WebSocketConnectionError } from '../../application/useChatWebSocket';
import { ResolvedBannerState } from '../BannerStateResolverService';
import { IErrorStateResolver } from '../interfaces/IErrorStateResolver';
import { BannerMessages } from '../constants/BannerMessages';


export class AuthErrorResolver implements IErrorStateResolver {
  private readonly authCodes = ['UNAUTHORIZED', 'FORBIDDEN'] as const;

  canHandle(error: WebSocketConnectionError): boolean {
    return this.authCodes.includes(error.code as (typeof this.authCodes)[number]);
  }

  resolve(
    error: WebSocketConnectionError,
    _onRetry: () => void,
    onGoBack: () => void,
  ): ResolvedBannerState {
    const subMessage =
      error.code === 'UNAUTHORIZED'
        ? BannerMessages.error.unauthorized
        : BannerMessages.error.forbidden;

    return {
      state: 'error',
      message: error.message,
      subMessage,
      actions: [{ label: BannerMessages.actions.goBack, onPress: onGoBack }],
    };
  }
}
