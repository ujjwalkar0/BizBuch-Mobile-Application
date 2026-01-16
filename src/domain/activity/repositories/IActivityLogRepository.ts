import { ActivityLog } from '../entities/ActivityLog';

/**
 * IActivityLogRepository Interface
 * Domain Layer: Repository abstraction
 * SOLID: Dependency Inversion - Data layer depends on this abstraction
 */
export interface IActivityLogRepository {
  /**
   * Get activity log for the current authenticated user
   * API: GET /activity/log/
   */
  getActivityLog(): Promise<ActivityLog[]>;
}
