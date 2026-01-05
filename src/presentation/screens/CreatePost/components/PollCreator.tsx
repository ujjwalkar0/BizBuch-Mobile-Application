import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Controller, Control, useFieldArray } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { styles } from '../styles';
import { CreatePostFormValues } from '../../../../ui/form-types/CreatePostForm.types';
import { PostRequestBody } from '../../../../domain/post/entities/Post';

interface Props {
  control: Control<CreatePostFormValues, any, PostRequestBody>;
  onRemovePoll: () => void;
}

export const PollCreator: React.FC<Props> = ({
  control,
  onRemovePoll,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'poll.options',
  });

  return (
    <View style={styles.pollContainer}>
      {/* Header */}
      <View style={styles.pollHeader}>
        <Text style={styles.pollTitle}>Create a Poll</Text>

        <TouchableOpacity onPress={onRemovePoll}>
          <FontAwesomeIcon icon={faXmark} size={18} />
        </TouchableOpacity>
      </View>

      {/* Question */}
      <Controller
        control={control}
        name="poll.question"
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            placeholder="Ask a question"
            value={field.value}
            onChangeText={field.onChange}
            style={styles.pollQuestionInput}
          />
        )}
      />

      {/* Options */}
      {fields.map((field, index) => (
        <View key={field.id} style={styles.pollOptionRow}>
          <Controller
            control={control}
            name={`poll.options.${index}.text`}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                placeholder={`Option ${index + 1}`}
                value={field.value}
                onChangeText={field.onChange}
                style={styles.pollOptionInput}
              />
            )}
          />

          {fields.length > 2 && (
            <TouchableOpacity onPress={() => remove(index)}>
              <FontAwesomeIcon icon={faXmark} size={16} />
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Add Option */}
      {fields.length < 5 && (
        <TouchableOpacity
          style={styles.addPollOption}
          onPress={() => append({ text: '' })}
        >
          <FontAwesomeIcon icon={faPlus} size={14} />
          <Text style={styles.addPollText}>Add option</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
