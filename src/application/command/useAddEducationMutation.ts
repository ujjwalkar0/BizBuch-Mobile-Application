import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileRepository } from '../../infrastructure/repositories/ProfileRepository';
import { AddEducationData } from '../../domain/user/repositories/IProfileRepository';


export const useAddEducationMutation = () => {
  const queryClient = useQueryClient();
  const profileRepo = new ProfileRepository();

  return useMutation({
    mutationFn: async (data: AddEducationData) => {
      await profileRepo.addEducation(data);
    },
    onSuccess: () => {
      // Invalidate profile queries to refetch with new education
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
};
