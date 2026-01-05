import { useMutation } from '@tanstack/react-query';
import { PostRepository } from '../../data/repositories/PostRepository';
import { CreatePostHandler } from '../../application/post/handler/CreatePostHandler';
import { MediaApi } from '../../data/services/MediaApi';
import { uploadToAWS } from '../../presentation/utils/uploadToAWS';
import { PostRequestBody } from '../../domain/post/entities/Post';

export const useCreatePostMutation = () => {
  const postRepo = new PostRepository();
  const handler = new CreatePostHandler(postRepo);
  const mediaApi = new MediaApi();

  return useMutation({
    mutationFn: async (input: PostRequestBody) => {

      if (input.imageUrl) {
        const { uploadUrl, publicUrl } = await mediaApi.getPresignedUrl();
        await uploadToAWS(uploadUrl, input.imageUrl);
        // .then((a) => {
        //   if (a){
        //     input.imageUrl = publicUrl;
        //   }
        // });
        input.imageUrl = publicUrl;
      }

      await handler.handle(input);
    },
  });
};
