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

    const { current_work } = connection;
    if (current_work?.job_title && current_work?.company_name) {
      return `${current_work.job_title} at ${current_work.company_name}`;
    }

    if (current_work?.job_title) {
      return current_work.job_title;
    }

    if (current_work?.company_name) {
      return current_work.company_name;
    }

    return '';
  }
}
