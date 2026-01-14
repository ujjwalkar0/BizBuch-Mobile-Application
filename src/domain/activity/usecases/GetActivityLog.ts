import { ActivityLog } from '../entities/ActivityLog';
import { IActivityLogRepository } from '../repositories/IActivityLogRepository';

/**
 * GetActivityLog UseCase
 * SOLID: Single Responsibility - Encapsulates activity log fetching logic
 * SOLID: Dependency Inversion - Depends on repository abstraction
 */
export class GetActivityLog {
  constructor(private readonly repository: IActivityLogRepository) {}

  async execute(): Promise<ActivityLog[]> {
    return this.repository.getActivityLog();
  }
}
