import React from 'react';
import { CreatePostScreenTemplate } from '../components/templates/CreatePostScreenTemplate';
import { useCreatePostScreen } from '../../ui/hooks/useCreatePostScreen';

/**
 * CreatePostScreen Page
 * Atomic Design: Page - Final screen with real data
 * SOLID Principles:
 * - Single Responsibility: Connect data to template
 * - Open/Closed: Extended through hook and template
 * - Dependency Inversion: Depends on abstractions (useCreatePostScreen, CreatePostScreenTemplate)
 */
export const CreatePostScreen: React.FC = () => {
  const {
    // Form
    control,
    audience,
    feeling,
    image,
    isPostDisabled,
    onSubmit,

    // Photo options modal
    showPhotoOptions,
    onOpenPhotoOptions,
    onClosePhotoOptions,
    onSelectImage,
    onRemoveImage,

    // Poll
    showPoll,
    onOpenPoll,
    onRemovePoll,

    // Feeling picker
    showFeelingPicker,
    onOpenFeelingPicker,
    onCloseFeelingPicker,
    onSelectFeeling,
  } = useCreatePostScreen();

  return (
    <CreatePostScreenTemplate
      // Form
      control={control}
      audience={audience}
      feeling={feeling}
      image={image}
      isPostDisabled={isPostDisabled}
      onSubmit={onSubmit}
      // Photo options
      showPhotoOptions={showPhotoOptions}
      onOpenPhotoOptions={onOpenPhotoOptions}
      onClosePhotoOptions={onClosePhotoOptions}
      onSelectImage={onSelectImage}
      onRemoveImage={onRemoveImage}
      // Poll
      showPoll={showPoll}
      onOpenPoll={onOpenPoll}
      onRemovePoll={onRemovePoll}
      // Feeling picker
      showFeelingPicker={showFeelingPicker}
      onOpenFeelingPicker={onOpenFeelingPicker}
      onCloseFeelingPicker={onCloseFeelingPicker}
      onSelectFeeling={onSelectFeeling}
    />
  );
};

