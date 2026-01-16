import { ActivityLog } from '../../domain/activity/entities/ActivityLog';
import { IActivityLogRepository } from '../../domain/activity/repositories/IActivityLogRepository';
import { getAuth } from '../../core/http';

/**
 * ActivityLogRepository Implementation
 * Data Layer: Implements repository interface
 * SOLID: Single Responsibility - Data access for activity logs
 * SOLID: Dependency Inversion - Implements domain interface
 */
export class ActivityLogRepository implements IActivityLogRepository {
  async getActivityLog(): Promise<ActivityLog[]> {
    return getAuth<ActivityLog[]>('activity/log/');
  }
}
