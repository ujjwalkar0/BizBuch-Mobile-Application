import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileRepository } from '../../data/repositories/ProfileRepository';
import { AddWorkExperienceData } from '../../domain/user/repositories/IProfileRepository';

/**
 * useAddWorkExperienceMutation Hook
 * SOLID Principles:
 * - Single Responsibility: Handle work experience creation mutation
 * - Dependency Inversion: Depends on ProfileRepository abstraction
 */
export const useAddWorkExperienceMutation = () => {
  const queryClient = useQueryClient();
  const profileRepo = new ProfileRepository();

  return useMutation({
    mutationFn: async (data: AddWorkExperienceData) => {
      await profileRepo.addWorkExperience(data);
    },
    onSuccess: () => {
      // Invalidate profile queries to refetch with new work experience
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
};
