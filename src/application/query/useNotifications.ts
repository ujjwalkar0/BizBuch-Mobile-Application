import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationRepository } from '../../di';

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationRepository.getNotifications(),
  });
};