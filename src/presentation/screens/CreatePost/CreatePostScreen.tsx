import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';

import { CreatePostHeader } from '../../components/CreatePostHeader';
import { UserSection } from '../../components/UserSection';
import { PostInput } from '../../components/PostInput';
import { SelectedImagePreview } from '../../components/SelectedImagePreview';
import { AddPostOptions } from '../../components/AddPostOptions';
import { PhotoOptionsModal } from '../../components/PhotoOptionsModal';
import { PollCreator } from '../../components/PollCreator';
import { FeelingPicker } from '../../components/FeelingPicker';

import { useCreatePostMutation } from '../../../ui/hooks/useCreatePostMutation';
import { CreatePostFormValues } from '../../../ui/form-types/CreatePostForm.types';
import { PostRequestBody } from '../../../domain/post/entities/Post';
import { createPostResolver } from '../../../ui/resolvers/createPostResolver';

export const CreatePostScreen: React.FC = () => {
  const [audience] = useState<'Public' | 'Friends' | 'Only Me'>('Public');
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const [showFeelingPicker, setShowFeelingPicker] = useState(false);

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
    resolver: createPostResolver
  });

  const content = watch('content');
  const image = watch('image');
  const poll = watch('poll');
  const feeling = watch('feeling');

  const createPostMutation = useCreatePostMutation();

  const onSubmit = (data: PostRequestBody) => {
    createPostMutation.mutate(
      data, 
      {
      onSuccess: () => {
        reset();
        setShowPoll(false);
      },
    });
  };

  const isPostDisabled = !content?.trim() && !image && !poll;

  return (
    <SafeAreaView edges={['top']}>
      <CreatePostHeader
        type="add"
        disabled={isPostDisabled}
        onPost={handleSubmit(onSubmit)}
      />

      <ScrollView>
        <UserSection
          userName="Ujjwal Kar"
          audience={audience}
          feeling={feeling}
        />

        <PostInput control={control} />

        {image && (
          <SelectedImagePreview
            uri={image}
            onRemove={() => setValue('image', undefined)}
          />
        )}

        <AddPostOptions
          onPhotoPress={() => setShowPhotoOptions(true)}
          onPollPress={() => {
            setShowPoll(true);
            setValue('poll', {
              question: '',
              options: [{ text: '' }, { text: '' }],
            });
          }}
          onFeelingPress={() => setShowFeelingPicker(true)}
        />

        <PhotoOptionsModal
          visible={showPhotoOptions}
          onClose={() => setShowPhotoOptions(false)}
          onSelectImage={uri => setValue('image', uri, { shouldDirty: true })}
        />

        {showPoll && (
          <PollCreator
            control={control}
            onRemovePoll={() => {
              setShowPoll(false);
              setValue('poll', undefined);
            }}
          />
        )}

        <FeelingPicker
          visible={showFeelingPicker}
          onClose={() => setShowFeelingPicker(false)}
          onSelect={selectedFeeling => {
            setValue('feeling', selectedFeeling, {
              shouldDirty: true,
            });
            setShowFeelingPicker(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
