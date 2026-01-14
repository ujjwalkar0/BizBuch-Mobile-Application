import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotificationsUseCase, markNotificationAsReadUseCase, markAllNotificationsAsReadUseCase } from '../di';

/**
 * useNotifications Hook
 * UI Layer: React Query hook for notifications data
 * SOLID: Single Responsibility - Manages notifications query state
 */
export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotificationsUseCase.execute(),
  });
};

/**
 * useMarkNotificationAsRead Hook
 * UI Layer: Mutation hook for marking single notification as read
 */
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => markNotificationAsReadUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

/**
 * useMarkAllNotificationsAsRead Hook
 * UI Layer: Mutation hook for marking all notifications as read
 */
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllNotificationsAsReadUseCase.execute(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
