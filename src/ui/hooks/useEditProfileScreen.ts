import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useCurrentUserProfile } from './useCurrentUserProfile';
import { useEditProfileForm } from '../form-hooks/useEditProfileForm';
import { useUpdateProfileMutation } from './useUpdateProfileMutation';
import { EditProfileFormValues } from '../form-types/EditProfileForm.types';

/**
 * useEditProfileScreen Hook
 * SOLID Principles:
 * - Single Responsibility: Manages form state, image picker state, and submission logic
 * - Open/Closed: Extensible through form configuration
 * - Dependency Inversion: Depends on abstractions (useCurrentUserProfile, useEditProfileForm, useUpdateProfileMutation)
 */
export const useEditProfileScreen = (onSuccess: () => void) => {
  // User data
  const { data: user, isLoading } = useCurrentUserProfile();

  // Form setup
  const {
    control,
    handleSubmit,
    reset,
    rules,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useEditProfileForm();

  // Mutation
  const updateProfileMutation = useUpdateProfileMutation();

  // Image picker state
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [imageType, setImageType] = useState<'avatar' | 'cover'>('avatar');

  // Watched values
  const avatarUri = watch('avatarUri');
  const coverImageUri = watch('coverImageUri');

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      reset({
        display_name: user.display_name || '',
        username: user.username || '',
        bio: user.bio || '',
        headline: user.headline || '',
        current_position: user.current_position || '',
        company: user.company || '',
        industry: user.industry || '',
        phone: user.phone || '',
        website: user.website || '',
        linkedin_url: user.linkedin_url || '',
        twitter_url: user.twitter_url || '',
      });
    }
  }, [user, reset]);

  // Derived state
  const isSaving = isSubmitting || updateProfileMutation.isPending;

  // Handlers
  const handleOpenImagePicker = useCallback((type: 'avatar' | 'cover') => {
    setImageType(type);
    setShowImagePicker(true);
  }, []);

  const handleCloseImagePicker = useCallback(() => {
    setShowImagePicker(false);
  }, []);

  const handleSelectImage = useCallback(
    (uri: string) => {
      if (imageType === 'avatar') {
        setValue('avatarUri', uri);
      } else {
        setValue('coverImageUri', uri);
      }
    },
    [imageType, setValue],
  );

  const handleAvatarPress = useCallback(() => {
    handleOpenImagePicker('avatar');
  }, [handleOpenImagePicker]);

  const handleCoverPress = useCallback(() => {
    handleOpenImagePicker('cover');
  }, [handleOpenImagePicker]);

  const handleSave = useCallback(
    async (data: EditProfileFormValues) => {
      try {
        await updateProfileMutation.mutateAsync({
          ...data,
          avatarUri: data.avatarUri || undefined,
          coverImageUri: data.coverImageUri || undefined,
        });

        Alert.alert('Success', 'Profile updated successfully!', [
          {
            text: 'OK',
            onPress: onSuccess,
          },
        ]);
      } catch (error) {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      }
    },
    [updateProfileMutation, onSuccess],
  );

  const onSubmit = handleSubmit(handleSave);

  return {
    // User data
    user,
    isLoading,

    // Form
    control,
    rules,
    errors,
    isSaving,
    onSubmit,

    // Image values
    avatarUri,
    coverImageUri,

    // Image picker modal
    showImagePicker,
    onCloseImagePicker: handleCloseImagePicker,
    onSelectImage: handleSelectImage,
    onAvatarPress: handleAvatarPress,
    onCoverPress: handleCoverPress,
  };
};
