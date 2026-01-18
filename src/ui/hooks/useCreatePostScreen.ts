import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { PostRequestBody } from '../../domain/post/entities/Post';
import { CreatePostFormValues } from '../form-types/CreatePostForm.types';
import { useCreatePostMutation } from './useCreatePostMutation';
import { createPostResolver } from '../resolvers/createPostResolver';

/**
 * Feeling type definition
 */
interface Feeling {
  id: string;
  label: string;
  emoji: string;
}

/**
 * Poll option type
 */
interface PollOption {
  text: string;
}

/**
 * useCreatePostScreen Hook
 * SOLID Principles:
 * - Single Responsibility: Manages form state and modal visibility logic
 * - Open/Closed: Extensible through form configuration
 * - Dependency Inversion: Depends on abstractions (useForm, useCreatePostMutation)
 */
export const useCreatePostScreen = () => {
  // Modal visibility states
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const [showFeelingPicker, setShowFeelingPicker] = useState(false);

  // Form setup
  const { control, watch, setValue, handleSubmit, reset } = useForm<
    CreatePostFormValues,
    any,
    PostRequestBody
  >({
    mode: 'onChange',
    defaultValues: {
      audience: 'Public',
      content: '',
      image: undefined,
      poll: undefined,
      feeling: undefined,
    },
    resolver: createPostResolver,
  });

  // Watched values
  const content = watch('content');
  const image = watch('image');
  const poll = watch('poll');
  const feeling = watch('feeling');
  const audience = watch('audience') ?? 'Public';

  // Mutation
  const createPostMutation = useCreatePostMutation();

  // Derived state
  const isPostDisabled = useMemo(
    () => !content?.trim() && !image && !poll,
    [content, image, poll],
  );

  // Handlers
  const handleOpenPhotoOptions = useCallback(() => {
    setShowPhotoOptions(true);
  }, []);

  const handleClosePhotoOptions = useCallback(() => {
    setShowPhotoOptions(false);
  }, []);

  const handleSelectImage = useCallback(
    (uri: string) => {
      setValue('image', uri, { shouldDirty: true });
    },
    [setValue],
  );

  const handleRemoveImage = useCallback(() => {
    setValue('image', undefined);
  }, [setValue]);

  const handleOpenPoll = useCallback(() => {
    setShowPoll(true);
    setValue('poll', {
      question: '',
      options: [{ text: '' }, { text: '' }] as PollOption[],
    });
  }, [setValue]);

  const handleRemovePoll = useCallback(() => {
    setShowPoll(false);
    setValue('poll', undefined);
  }, [setValue]);

  const handleOpenFeelingPicker = useCallback(() => {
    setShowFeelingPicker(true);
  }, []);

  const handleCloseFeelingPicker = useCallback(() => {
    setShowFeelingPicker(false);
  }, []);

  const handleSelectFeeling = useCallback(
    (selectedFeeling: Feeling) => {
      setValue('feeling', selectedFeeling, { shouldDirty: true });
      setShowFeelingPicker(false);
    },
    [setValue],
  );

  const handlePost = useCallback(
    (data: PostRequestBody) => {
      createPostMutation.mutate(data, {
        onSuccess: () => {
          reset();
          setShowPoll(false);
        },
      });
    },
    [createPostMutation, reset],
  );

  const onSubmit = handleSubmit(handlePost);

  return {
    // Form
    control,
    audience,
    content,
    image,
    poll,
    feeling,
    isPostDisabled,
    onSubmit,

    // Photo options modal
    showPhotoOptions,
    onOpenPhotoOptions: handleOpenPhotoOptions,
    onClosePhotoOptions: handleClosePhotoOptions,
    onSelectImage: handleSelectImage,
    onRemoveImage: handleRemoveImage,

    // Poll
    showPoll,
    onOpenPoll: handleOpenPoll,
    onRemovePoll: handleRemovePoll,

    // Feeling picker
    showFeelingPicker,
    onOpenFeelingPicker: handleOpenFeelingPicker,
    onCloseFeelingPicker: handleCloseFeelingPicker,
    onSelectFeeling: handleSelectFeeling,
  };
};
