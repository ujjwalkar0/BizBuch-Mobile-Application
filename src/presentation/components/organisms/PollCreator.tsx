import React, { useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Controller, Control, useFieldArray } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CreatePostFormValues } from '../../../ui/form-types/CreatePostForm.types';
import { PostRequestBody } from '../../../domain/post/entities/Post';
import { theme } from '../../theme';

const { pollCreator } = theme.components;

interface PollCreatorProps {
  control: Control<CreatePostFormValues, any, PostRequestBody>;
  onRemovePoll: () => void;
}

/**
 * PollCreator Organism
 * Atomic Design: Organism - Complex form with multiple inputs
 * Single Responsibility: Manage poll creation with question and options
 * SOLID: Open/Closed - Styles from theme
 * SOLID: Dependency Inversion - Uses react-hook-form for state management
 */
export const PollCreator: React.FC<PollCreatorProps> = ({ control, onRemovePoll }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'poll.options',
  });

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      padding: pollCreator.padding,
      borderRadius: pollCreator.borderRadius,
      borderWidth: pollCreator.borderWidth,
      borderColor: theme.colors.gray200,
      backgroundColor: theme.colors.white,
      marginBottom: pollCreator.marginBottom,
    }),
    [],
  );

  const headerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: pollCreator.headerMarginBottom,
    }),
    [],
  );

  const titleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: pollCreator.titleFontSize,
      fontWeight: pollCreator.titleFontWeight,
      color: theme.colors.gray800,
    }),
    [],
  );

  const inputStyle = useMemo<TextStyle>(
    () => ({
      padding: pollCreator.inputPadding,
      borderRadius: pollCreator.inputBorderRadius,
      borderWidth: pollCreator.inputBorderWidth,
      borderColor: theme.colors.gray200,
      fontSize: pollCreator.inputFontSize,
      backgroundColor: theme.colors.gray50,
      color: theme.colors.gray900,
    }),
    [],
  );

  const questionInputStyle = useMemo<TextStyle>(
    () => ({
      ...inputStyle,
      marginBottom: pollCreator.questionMarginBottom,
    }),
    [inputStyle],
  );

  const optionRowStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: pollCreator.optionMarginBottom,
      gap: 8,
    }),
    [],
  );

  const optionInputStyle = useMemo<TextStyle>(
    () => ({
      ...inputStyle,
      flex: 1,
    }),
    [inputStyle],
  );

  const addOptionStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: pollCreator.addOptionPaddingVertical,
      gap: pollCreator.addOptionGap,
    }),
    [],
  );

  const addOptionTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: pollCreator.addOptionFontSize,
      color: theme.colors.primary,
    }),
    [],
  );

  return (
    <View style={containerStyle}>
      {/* Header */}
      <View style={headerStyle}>
        <Text style={titleStyle}>Create a Poll</Text>
        <TouchableOpacity onPress={onRemovePoll} activeOpacity={0.7}>
          <FontAwesomeIcon icon={faXmark} size={18} color={theme.colors.gray500} />
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
            placeholderTextColor={theme.colors.gray400}
            value={field.value}
            onChangeText={field.onChange}
            style={questionInputStyle}
          />
        )}
      />

      {/* Options */}
      {fields.map((field, index) => (
        <View key={field.id} style={optionRowStyle}>
          <Controller
            control={control}
            name={`poll.options.${index}.text`}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                placeholder={`Option ${index + 1}`}
                placeholderTextColor={theme.colors.gray400}
                value={field.value}
                onChangeText={field.onChange}
                style={optionInputStyle}
              />
            )}
          />

          {fields.length > 2 && (
            <TouchableOpacity onPress={() => remove(index)} activeOpacity={0.7}>
              <FontAwesomeIcon icon={faXmark} size={16} color={theme.colors.gray500} />
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Add Option */}
      {fields.length < 5 && (
        <TouchableOpacity
          style={addOptionStyle}
          onPress={() => append({ text: '' })}
          activeOpacity={0.7}
        >
          <FontAwesomeIcon icon={faPlus} size={14} color={theme.colors.primary} />
          <Text style={addOptionTextStyle}>Add option</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
