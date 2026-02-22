import { useMutation } from '@tanstack/react-query';
import { MediaApi } from '../../infrastructure/services/MediaApi';
import { uploadToAWS } from '../../presentation/utils/uploadToAWS';
import { PostRequestBody } from '../../domain/post/entities/Post';

import { postRepository } from '../../di';

export const useCreatePostMutation = () => {
  const mediaApi = new MediaApi();

  return useMutation({
    mutationFn: async (input: PostRequestBody) => {

      if (input.imageUrl) {
        const { uploadUrl, publicUrl } = await mediaApi.getPresignedUrl();
        await uploadToAWS(uploadUrl, input.imageUrl);
        input.imageUrl = publicUrl;
      }

      await postRepository.create(input);
    },
  });
};
