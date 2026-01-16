/**
 * Banner Message Constants
 * SOLID: Single Responsibility - Centralized message definitions
 * SOLID: Open/Closed - Add new messages without modifying resolver logic
 */
export const BannerMessages = {
  connecting: {
    initial: 'Connecting...',
    reconnecting: (attempt: number, max: number = 5) =>
      `Reconnecting... (attempt ${attempt}/${max})`,
  },
  warning: {
    offline: 'Real-time updates unavailable. Messages will still be sent.',
  },
  error: {
    unauthorized: 'Please log in again to continue.',
    forbidden: 'You cannot access this conversation.',
  },
  actions: {
    retry: 'Retry',
    goBack: 'Go Back',
  },
} as const;
