/**
 * Utility service for date formatting
 * Single Responsibility: Date formatting logic
 */

export const DateFormatterService = {
  /**
   * Format a timestamp as a date separator (e.g., "Today", "Yesterday", "Monday, Jan 15")
   */
  formatDateSeparator: (timestamp: string): string => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      });
    }
  },

  /**
   * Check if a date separator should be shown between two messages
   */
  shouldShowDateSeparator: (
    currentTimestamp: string,
    nextTimestamp: string,
  ): boolean => {
    const currentDate = new Date(currentTimestamp).toDateString();
    const nextDate = new Date(nextTimestamp).toDateString();
    return currentDate !== nextDate;
  },

  /**
   * Get all dates where separators should be shown
   */
  getDateSeparatorIndices: (timestamps: string[]): number[] => {
    const indices: number[] = [];

    for (let i = 0; i < timestamps.length - 1; i++) {
      if (
        DateFormatterService.shouldShowDateSeparator(
          timestamps[i],
          timestamps[i + 1],
        )
      ) {
        indices.push(i);
      }
    }

    // Always show separator for the last message
    if (timestamps.length > 0) {
      indices.push(timestamps.length - 1);
    }

    return indices;
  },
};
