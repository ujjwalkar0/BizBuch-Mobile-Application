import { useQuery } from '@tanstack/react-query';
import { activityLogRepository } from '../../di';


export const useActivityLog = () => {
  return useQuery({
    queryKey: ['activityLog'],
    queryFn: () => activityLogRepository.getActivityLog(),
  });
};
