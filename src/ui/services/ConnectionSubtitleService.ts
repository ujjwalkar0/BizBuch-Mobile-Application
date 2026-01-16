import { Connection } from '../../domain/user/entities/Connection';

/**
 * ConnectionSubtitleService
 * SOLID: Single Responsibility - Generates subtitle text for connection cards
 * SOLID: Open/Closed - Add new subtitle logic without modifying existing
 */
export class ConnectionSubtitleService {
  static getSubtitle(connection: Connection): string {
    if (connection.headline) {
      return connection.headline;
    }

    if (connection.current_position && connection.company) {
      return `${connection.current_position} at ${connection.company}`;
    }

    if (connection.current_position) {
      return connection.current_position;
    }

    if (connection.company) {
      return connection.company;
    }

    return '';
  }
}
