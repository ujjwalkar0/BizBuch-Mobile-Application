import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileRepository } from "../di";
import { UpdateProfile } from "../../domain/user/usecases/UpdateProfile";
import { UpdateProfileData } from "../../domain/user/repositories/IProfileRepository";
import { MediaApi } from "../../data/services/MediaApi";
import { uploadToAWS } from "../../presentation/utils/uploadToAWS";

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const updateProfileUseCase = new UpdateProfile(profileRepository);
  const mediaApi = new MediaApi();

  return useMutation({
    mutationFn: async (input: UpdateProfileData & { avatarUri?: string; coverImageUri?: string }) => {
      const updateData: UpdateProfileData = { ...input };

      // Upload avatar if provided
      if (input.avatarUri) {
        const { uploadUrl, publicUrl } = await mediaApi.getPresignedUrl();
        await uploadToAWS(uploadUrl, input.avatarUri);
        updateData.avatar = publicUrl;
      }

      // Upload cover image if provided
      if (input.coverImageUri) {
        const { uploadUrl, publicUrl } = await mediaApi.getPresignedUrl();
        await uploadToAWS(uploadUrl, input.coverImageUri);
        updateData.cover_image = publicUrl;
      }

      // Remove local URIs before sending to API
      delete (updateData as any).avatarUri;
      delete (updateData as any).coverImageUri;

      return updateProfileUseCase.execute(updateData);
    },
    onSuccess: () => {
      // Invalidate the current user profile query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
};
