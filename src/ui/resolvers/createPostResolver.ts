import { PostRequestBody } from '../../domain/post/entities/Post';
import { CreatePostFormValues } from '../form-types/CreatePostForm.types';

import { Resolver, FieldErrors } from 'react-hook-form';

export const createPostResolver: Resolver<
  CreatePostFormValues,
  any,
  PostRequestBody
> = async (data) => {
  const errors: FieldErrors<CreatePostFormValues> = {};

  const hasContent = data.content?.trim();
  const hasImage = data.image;
  const hasPoll =
    data.poll?.question?.trim() &&
    data.poll.options.length >= 2;

  if (!hasContent && !hasImage && !hasPoll) {
    errors.content = {
      type: 'required',
      message: 'Post must have content, image, or poll',
    };
  }

  if (data.poll) {
    if (!data.poll.question?.trim()) {
      errors.poll = {
        type: 'required',
        message: 'Poll question is required',
      };
    }

    if (data.poll.options.length < 2) {
      errors.poll = {
        type: 'minLength',
        message: 'Poll must have at least 2 options',
      };
    }

    const optionTexts = data.poll.options.map(o =>
      o.text.trim().toLowerCase()
    );

    if (optionTexts.some(t => !t)) {
      errors.poll = {
        type: 'validate',
        message: 'All poll options must have text',
      };
    }

    if (new Set(optionTexts).size !== optionTexts.length) {
      errors.poll = {
        type: 'validate',
        message: 'Poll options must be unique',
      };
    }
  }

  return {
    values: {
      privacy: data.audience,
      content: data.content?.trim(),
      imageUrl: data.image,
      poll: data.poll
        ? {
            question: data.poll.question.trim(),
            options: data.poll.options.map(o => o.text.trim()),
          }
        : undefined,
      location: data.location?.name,
      feeling: data.feeling?.emoji,
    },
    errors: {},
  };
};
