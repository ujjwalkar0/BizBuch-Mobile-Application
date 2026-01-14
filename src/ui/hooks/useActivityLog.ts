import { useQuery } from '@tanstack/react-query';
import { getActivityLogUseCase } from '../di';

/**
 * useActivityLog Hook
 * UI Layer: React Query hook for activity log data
 * SOLID: Single Responsibility - Manages activity log query state
 */
export const useActivityLog = () => {
  return useQuery({
    queryKey: ['activityLog'],
    queryFn: () => getActivityLogUseCase.execute(),
  });
};
