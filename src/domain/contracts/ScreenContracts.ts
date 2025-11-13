// src/domain/contracts/ScreenContracts.ts

/**
 * Shared interface for screens that need navigation callbacks.
 * Keeps presentation layer decoupled from React Navigation directly.
 */
export interface NavigableScreenProps {
  /**
   * Callback to navigate between screens or tabs.
   * Accepts a string representing the destination key.
   */
  onNavigate: (key: string) => void;
}
