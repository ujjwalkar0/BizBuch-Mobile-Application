import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { EditProfileScreenTemplate } from '../components/templates/EditProfileScreenTemplate';
import { useEditProfileScreen } from './hooks/useEditProfileScreen';

type EditProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditProfile'
>;


export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  navigation,
}) => {
  const {
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
    onCloseImagePicker,
    onSelectImage,
    onAvatarPress,
    onCoverPress,
  } = useEditProfileScreen(() => navigation.goBack());

  return (
    <EditProfileScreenTemplate
      // Loading/Error states
      isLoading={isLoading}
      hasUser={!!user}
      // Header
      onBack={() => navigation.goBack()}
      onSave={onSubmit}
      isSaving={isSaving}
      // Images
      avatarUri={avatarUri}
      coverImageUri={coverImageUri}
      defaultAvatar={user?.avatar}
      defaultCoverImage={user?.cover_image}
      onAvatarPress={onAvatarPress}
      onCoverPress={onCoverPress}
      // Image picker modal
      showImagePicker={showImagePicker}
      onCloseImagePicker={onCloseImagePicker}
      onSelectImage={onSelectImage}
      // Form
      control={control}
      rules={rules}
      errors={errors}
    />
  );
};
