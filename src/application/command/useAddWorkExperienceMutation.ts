import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileRepository } from '../../infrastructure/repositories/ProfileRepository';
import { AddWorkExperienceData } from '../../domain/user/repositories/IProfileRepository';

export const useAddWorkExperienceMutation = () => {
  const queryClient = useQueryClient();
  const profileRepo = new ProfileRepository();

  return useMutation({
    mutationFn: async (data: AddWorkExperienceData) => {
      await profileRepo.addWorkExperience(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
};
