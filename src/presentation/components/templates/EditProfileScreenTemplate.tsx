import React, { useMemo } from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Control, FieldErrors, Controller } from 'react-hook-form';
import { EditProfileFormValues } from '../../../ui/form-types/EditProfileForm.types';
import { theme } from '../../theme';

// Atoms
import { FormInput } from '../atoms/FormInput';

// Molecules
import { CenteredLoader } from '../molecules/CenteredLoader';
import { CenteredError } from '../molecules/CenteredError';
import { EditProfileHeader } from '../molecules/EditProfileHeader';
import { ProfileImageSection } from '../molecules/ProfileImageSection';
import { FormSection } from '../molecules/FormSection';

// Organisms
import { ImagePickerModal } from '../organisms/ImagePickerModal';

const { editProfileScreenTemplate } = theme.components;

interface EditProfileScreenTemplateProps {
  // Loading/Error states
  isLoading: boolean;
  hasUser: boolean;

  // Header props
  onBack: () => void;
  onSave: () => void;
  isSaving: boolean;

  // Image props
  avatarUri?: string | null;
  coverImageUri?: string | null;
  defaultAvatar?: string;
  defaultCoverImage?: string;
  onAvatarPress: () => void;
  onCoverPress: () => void;

  // Image picker modal
  showImagePicker: boolean;
  onCloseImagePicker: () => void;
  onSelectImage: (uri: string) => void;

  // Form props
  control: Control<EditProfileFormValues>;
  rules: any;
  errors: FieldErrors<EditProfileFormValues>;
}

/**
 * EditProfileScreenTemplate
 * Atomic Design: Template - Defines the layout structure for edit profile screen
 * SOLID Principles:
 * - Single Responsibility: Layout orchestration only
 * - Open/Closed: Content passed via props, easily extensible
 * - Dependency Inversion: Depends on abstractions (atoms, molecules, organisms)
 */
export const EditProfileScreenTemplate: React.FC<EditProfileScreenTemplateProps> = ({
  // Loading/Error
  isLoading,
  hasUser,

  // Header
  onBack,
  onSave,
  isSaving,

  // Images
  avatarUri,
  coverImageUri,
  defaultAvatar,
  defaultCoverImage,
  onAvatarPress,
  onCoverPress,

  // Image picker modal
  showImagePicker,
  onCloseImagePicker,
  onSelectImage,

  // Form
  control,
  rules,
  errors,
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flex: editProfileScreenTemplate.flex,
      backgroundColor: theme.colors.gray100,
    }),
    [],
  );

  const formContainerStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.white,
      paddingHorizontal: editProfileScreenTemplate.formPaddingHorizontal,
      paddingVertical: editProfileScreenTemplate.formPaddingVertical,
    }),
    [],
  );

  // Loading state
  if (isLoading) {
    return <CenteredLoader />;
  }

  // Error state
  if (!hasUser) {
    return <CenteredError message="Failed to load profile" />;
  }

  return (
    <SafeAreaView edges={['top']} style={containerStyle}>
      <EditProfileHeader
        title="Edit Profile"
        onBack={onBack}
        onSave={onSave}
        isSaving={isSaving}
      />

      <ScrollView style={{ flex: 1 }}>
        <ProfileImageSection
          avatarUri={avatarUri}
          coverImageUri={coverImageUri}
          defaultAvatar={defaultAvatar}
          defaultCoverImage={defaultCoverImage}
          onAvatarPress={onAvatarPress}
          onCoverPress={onCoverPress}
        />

        <View style={formContainerStyle}>
          {/* Basic Information */}
          <FormSection>
            <Controller
              control={control}
              name="display_name"
              rules={rules.display_name}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Display Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your display name"
                  error={errors.display_name?.message}
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="username"
              rules={rules.username}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Username"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="@username"
                  error={errors.username?.message}
                  required
                  autoCapitalize="none"
                />
              )}
            />

            <Controller
              control={control}
              name="headline"
              rules={rules.headline}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Headline"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="e.g., Senior Software Engineer at Google"
                  error={errors.headline?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="bio"
              rules={rules.bio}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Bio"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Tell us about yourself..."
                  error={errors.bio?.message}
                  multiline
                  numberOfLines={4}
                />
              )}
            />
          </FormSection>

          {/* Professional Information */}
          <FormSection>
            <Controller
              control={control}
              name="current_position"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Current Position"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Job title"
                />
              )}
            />

            <Controller
              control={control}
              name="company"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Company"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Company name"
                />
              )}
            />

            <Controller
              control={control}
              name="industry"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Industry"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="e.g., Technology, Finance"
                />
              )}
            />
          </FormSection>

          {/* Contact Information */}
          <FormSection title="Contact Information" showSeparator>
            <Controller
              control={control}
              name="phone"
              rules={rules.phone}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Phone"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="+1 (555) 123-4567"
                  error={errors.phone?.message}
                  keyboardType="phone-pad"
                />
              )}
            />

            <Controller
              control={control}
              name="website"
              rules={rules.website}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Website"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="https://yourwebsite.com"
                  error={errors.website?.message}
                  keyboardType="url"
                  autoCapitalize="none"
                />
              )}
            />

            <Controller
              control={control}
              name="linkedin_url"
              rules={rules.linkedin_url}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="LinkedIn URL"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="https://linkedin.com/in/username"
                  error={errors.linkedin_url?.message}
                  keyboardType="url"
                  autoCapitalize="none"
                />
              )}
            />

            <Controller
              control={control}
              name="twitter_url"
              rules={rules.twitter_url}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Twitter URL"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="https://twitter.com/username"
                  error={errors.twitter_url?.message}
                  keyboardType="url"
                  autoCapitalize="none"
                />
              )}
            />
          </FormSection>
        </View>
      </ScrollView>

      <ImagePickerModal
        visible={showImagePicker}
        onClose={onCloseImagePicker}
        onSelectImage={onSelectImage}
      />
    </SafeAreaView>
  );
};
