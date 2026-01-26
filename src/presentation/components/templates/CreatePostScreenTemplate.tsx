import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Control } from 'react-hook-form';
import { CreatePostFormValues } from '../../../ui/form-types/CreatePostForm.types';
import { PostRequestBody } from '../../../domain/post/entities/Post';
import { theme } from '../../theme';

// Molecules
import { AddPostOptions } from '../molecules/AddPostOptions';
import { PageHeader } from '../molecules/PageHeader';
import { PostInput } from '../molecules/PostInput';
import { SelectedImagePreview } from '../molecules/SelectedImagePreview';
import { UserSection } from '../molecules/UserSection';

// Organisms
import { FeelingPicker } from '../organisms/FeelingPicker';
import { PhotoOptionsModal } from '../organisms/PhotoOptionsModal';
import { PollCreator } from '../organisms/PollCreator';

const { createPostScreenTemplate } = theme.components;

/**
 * Feeling type definition
 */
interface Feeling {
  id: string;
  label: string;
  emoji: string;
}

interface CreatePostScreenTemplateProps {
  // Form props
  control: Control<CreatePostFormValues, any, PostRequestBody>;
  audience: string;
  feeling?: Feeling | null;
  image?: string;
  isPostDisabled: boolean;
  onSubmit: () => void;

  // Photo options modal
  showPhotoOptions: boolean;
  onOpenPhotoOptions: () => void;
  onClosePhotoOptions: () => void;
  onSelectImage: (uri: string) => void;
  onRemoveImage: () => void;

  // Poll
  showPoll: boolean;
  onOpenPoll: () => void;
  onRemovePoll: () => void;

  // Feeling picker
  showFeelingPicker: boolean;
  onOpenFeelingPicker: () => void;
  onCloseFeelingPicker: () => void;
  onSelectFeeling: (feeling: Feeling) => void;

  // User
  avatarUri: string;
}

/**
 * CreatePostScreenTemplate
 * Atomic Design: Template - Defines the layout structure for create post screen
 * SOLID Principles:
 * - Single Responsibility: Layout orchestration only
 * - Open/Closed: Content passed via props, easily extensible
 * - Dependency Inversion: Depends on abstractions (molecules, organisms)
 */
export const CreatePostScreenTemplate: React.FC<CreatePostScreenTemplateProps> = ({
  // Form
  control,
  audience,
  feeling,
  image,
  isPostDisabled,
  onSubmit,

  // Photo options
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

  // User
  avatarUri
}) => {
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flex: createPostScreenTemplate.flex,
      backgroundColor: theme.colors.white,
    }),
    [],
  );

  return (
    <SafeAreaView style={containerStyle} edges={['top']}>
      <PageHeader
        title="Create Post"
        rightAction={{ type: 'text', label: 'Post', onPress: onSubmit, disabled: isPostDisabled }}
      />

      <ScrollView style={styles.scrollView}>
        <UserSection
          userName="Ujjwal Kar"
          userAvatar={avatarUri}
          audience={audience}
          feeling={feeling}
        />

        <PostInput control={control} />

        {image && (
          <SelectedImagePreview uri={image} onRemove={onRemoveImage} />
        )}

        <AddPostOptions
          onPhotoPress={onOpenPhotoOptions}
          onPollPress={onOpenPoll}
          onFeelingPress={onOpenFeelingPicker}
        />

        <PhotoOptionsModal
          visible={showPhotoOptions}
          onClose={onClosePhotoOptions}
          onSelectImage={onSelectImage}
        />

        {showPoll && (
          <PollCreator control={control} onRemovePoll={onRemovePoll} />
        )}

        <FeelingPicker
          visible={showFeelingPicker}
          onClose={onCloseFeelingPicker}
          onSelect={onSelectFeeling}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
