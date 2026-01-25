import React, { useMemo, useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Control, FieldErrors, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faChevronDown, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AddWorkExperienceFormValues, EmploymentType } from '../../../ui/form-types/AddWorkExperienceForm.types';
import { theme } from '../../theme';

// Atoms
import { FormInput } from '../atoms/FormInput';

// Molecules
import { FormSection } from '../molecules/FormSection';

interface PickerOption<T> {
  label: string;
  value: T;
}

interface PickerModalState {
  visible: boolean;
  title: string;
  options: PickerOption<any>[];
  currentValue: any;
  onSelect: (value: any) => void;
}

interface AddWorkExperienceScreenTemplateProps {
  // Form props
  control: Control<AddWorkExperienceFormValues>;
  errors: FieldErrors<AddWorkExperienceFormValues>;
  rules: any;

  // State
  isCurrent: boolean;
  isLoading: boolean;
  isSubmitDisabled: boolean;

  // Options
  yearOptions: PickerOption<number>[];
  monthOptions: PickerOption<number>[];
  employmentTypeOptions: PickerOption<EmploymentType>[];

  // Actions
  onSubmit: () => void;
  onBack: () => void;
  onToggleIsCurrent: (value: boolean) => void;
}

/**
 * AddWorkExperienceScreenTemplate
 * Atomic Design: Template - Layout structure for adding work experience
 * SOLID Principles:
 * - Single Responsibility: Layout orchestration only
 * - Open/Closed: Content passed via props
 * - Dependency Inversion: Depends on abstractions
 */
export const AddWorkExperienceScreenTemplate: React.FC<
  AddWorkExperienceScreenTemplateProps
> = ({
  control,
  errors,
  rules,
  isCurrent,
  isLoading,
  isSubmitDisabled,
  yearOptions,
  monthOptions,
  employmentTypeOptions,
  onSubmit,
  onBack,
  onToggleIsCurrent,
}) => {
  // Picker modal state
  const [pickerModal, setPickerModal] = useState<PickerModalState>({
    visible: false,
    title: '',
    options: [],
    currentValue: undefined,
    onSelect: () => {},
  });

  const openPicker = useCallback(
    <T extends string | number>(
      title: string,
      options: PickerOption<T>[],
      currentValue: T | undefined,
      onSelect: (value: T) => void,
    ) => {
      setPickerModal({
        visible: true,
        title,
        options,
        currentValue,
        onSelect,
      });
    },
    [],
  );

  const closePicker = useCallback(() => {
    setPickerModal((prev) => ({ ...prev, visible: false }));
  }, []);

  const handlePickerSelect = useCallback(
    (value: any) => {
      pickerModal.onSelect(value);
      closePicker();
    },
    [pickerModal, closePicker],
  );

  // Styles
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      backgroundColor: theme.colors.white,
    }),
    [],
  );

  const headerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray200,
    }),
    [],
  );

  const backButtonStyle = useMemo<ViewStyle>(
    () => ({
      padding: 8,
    }),
    [],
  );

  const headerTitleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.gray900,
    }),
    [],
  );

  const saveButtonStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: isSubmitDisabled
        ? theme.colors.gray300
        : theme.colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 20,
    }),
    [isSubmitDisabled],
  );

  const saveButtonTextStyle = useMemo<TextStyle>(
    () => ({
      color: theme.colors.white,
      fontWeight: '600',
      fontSize: 14,
    }),
    [],
  );

  const scrollContentStyle = useMemo<ViewStyle>(
    () => ({
      padding: 16,
      paddingBottom: 40,
    }),
    [],
  );

  const rowStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      gap: 12,
    }),
    [],
  );

  const halfInputStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
    }),
    [],
  );

  const switchRowStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      marginBottom: 16,
    }),
    [],
  );

  const switchLabelStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 16,
      color: theme.colors.gray900,
    }),
    [],
  );

  const pickerContainerStyle = useMemo<ViewStyle>(
    () => ({
      marginBottom: 20,
    }),
    [],
  );

  const pickerLabelStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.gray700,
      marginBottom: 8,
    }),
    [],
  );

  const pickerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.gray50,
      borderWidth: 1,
      borderColor: theme.colors.gray300,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 14,
    }),
    [],
  );

  const pickerTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 16,
      color: theme.colors.gray900,
    }),
    [],
  );

  const placeholderTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 16,
      color: theme.colors.gray400,
    }),
    [],
  );

  const errorTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 12,
      color: theme.colors.red500,
      marginTop: 4,
    }),
    [],
  );

  // Modal styles
  const modalOverlayStyle = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    }),
    [],
  );

  const modalContentStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '70%',
    }),
    [],
  );

  const modalHeaderStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray200,
    }),
    [],
  );

  const modalTitleStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.gray900,
    }),
    [],
  );

  const modalCloseButtonStyle = useMemo<ViewStyle>(
    () => ({
      padding: 4,
    }),
    [],
  );

  const optionItemStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray100,
    }),
    [],
  );

  const optionTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 16,
      color: theme.colors.gray900,
    }),
    [],
  );

  const selectedOptionTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: '600',
    }),
    [],
  );

  // Helper to render picker field
  const renderPickerField = <T extends string | number>(
    label: string,
    value: T | undefined,
    options: PickerOption<T>[],
    onChange: (value: T) => void,
    error?: string,
    required?: boolean,
  ) => {
    const selectedOption = options.find((opt) => opt.value === value);
    const displayValue = selectedOption?.label;

    return (
      <View style={pickerContainerStyle}>
        <Text style={pickerLabelStyle}>
          {label}
          {required && <Text style={{ color: theme.colors.red500 }}> *</Text>}
        </Text>
        <TouchableOpacity
          style={[pickerStyle, error && { borderColor: theme.colors.red500 }]}
          onPress={() => openPicker(label, options, value, onChange)}
        >
          <Text style={displayValue ? pickerTextStyle : placeholderTextStyle}>
            {displayValue || 'Select...'}
          </Text>
          <FontAwesomeIcon
            icon={faChevronDown}
            size={14}
            color={theme.colors.gray500}
          />
        </TouchableOpacity>
        {error && <Text style={errorTextStyle}>{error}</Text>}
      </View>
    );
  };

  // Render option item for FlatList
  const renderOptionItem = useCallback(
    ({ item }: { item: PickerOption<any> }) => {
      const isSelected = item.value === pickerModal.currentValue;
      return (
        <TouchableOpacity
          style={optionItemStyle}
          onPress={() => handlePickerSelect(item.value)}
        >
          <Text style={isSelected ? selectedOptionTextStyle : optionTextStyle}>
            {item.label}
          </Text>
          {isSelected && (
            <FontAwesomeIcon
              icon={faCheck}
              size={18}
              color={theme.colors.primary}
            />
          )}
        </TouchableOpacity>
      );
    },
    [pickerModal.currentValue, handlePickerSelect, optionItemStyle, optionTextStyle, selectedOptionTextStyle],
  );

  return (
    <SafeAreaView edges={['top']} style={containerStyle}>
      {/* Header */}
      <View style={headerStyle}>
        <TouchableOpacity style={backButtonStyle} onPress={onBack}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={20}
            color={theme.colors.gray900}
          />
        </TouchableOpacity>

        <Text style={headerTitleStyle}>Add Work Experience</Text>

        <TouchableOpacity
          style={saveButtonStyle}
          onPress={onSubmit}
          disabled={isSubmitDisabled}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.colors.white} />
          ) : (
            <Text style={saveButtonTextStyle}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Form Content */}
      <ScrollView contentContainerStyle={scrollContentStyle}>
        {/* Basic Information */}
        <FormSection title="Position Details" showSeparator>
          <Controller
            control={control}
            name="job_title"
            rules={rules.job_title}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Job Title"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="e.g., Software Engineer"
                error={errors.job_title?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="company_name"
            rules={rules.company_name}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Company Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="e.g., Google"
                error={errors.company_name?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="location"
            rules={rules.location}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Location"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="e.g., San Francisco, CA"
                error={errors.location?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="employment_type"
            render={({ field: { onChange, value } }) =>
              renderPickerField(
                'Employment Type',
                value,
                employmentTypeOptions,
                onChange,
                errors.employment_type?.message,
                true,
              )
            }
          />
        </FormSection>

        {/* Duration */}
        <FormSection title="Duration" showSeparator>
          {/* Is Current Switch */}
          <View style={switchRowStyle}>
            <Text style={switchLabelStyle}>I currently work here</Text>
            <Switch
              value={isCurrent}
              onValueChange={onToggleIsCurrent}
              trackColor={{
                false: theme.colors.gray300,
                true: theme.colors.primary,
              }}
              thumbColor={theme.colors.white}
            />
          </View>

          {/* Start Date */}
          <View style={rowStyle}>
            <View style={halfInputStyle}>
              <Controller
                control={control}
                name="start_month"
                rules={rules.start_month}
                render={({ field: { onChange, value } }) =>
                  renderPickerField(
                    'Start Month',
                    value,
                    monthOptions,
                    onChange,
                    errors.start_month?.message,
                    true,
                  )
                }
              />
            </View>
            <View style={halfInputStyle}>
              <Controller
                control={control}
                name="start_year"
                rules={rules.start_year}
                render={({ field: { onChange, value } }) =>
                  renderPickerField(
                    'Start Year',
                    value,
                    yearOptions,
                    onChange,
                    errors.start_year?.message,
                    true,
                  )
                }
              />
            </View>
          </View>

          {/* End Date (only if not current) */}
          {!isCurrent && (
            <View style={rowStyle}>
              <View style={halfInputStyle}>
                <Controller
                  control={control}
                  name="end_month"
                  rules={rules.end_month}
                  render={({ field: { onChange, value } }) =>
                    renderPickerField(
                      'End Month',
                      value,
                      monthOptions,
                      onChange,
                      errors.end_month?.message,
                    )
                  }
                />
              </View>
              <View style={halfInputStyle}>
                <Controller
                  control={control}
                  name="end_year"
                  rules={rules.end_year}
                  render={({ field: { onChange, value } }) =>
                    renderPickerField(
                      'End Year',
                      value,
                      yearOptions,
                      onChange,
                      errors.end_year?.message,
                    )
                  }
                />
              </View>
            </View>
          )}
        </FormSection>

        {/* Additional Details */}
        <FormSection title="Additional Details">
          <Controller
            control={control}
            name="description"
            rules={rules.description}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Description"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Describe your responsibilities and achievements..."
                error={errors.description?.message}
                multiline
                numberOfLines={4}
              />
            )}
          />

          <Controller
            control={control}
            name="skills"
            rules={rules.skills}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Skills"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="e.g., React, TypeScript, Node.js (comma separated)"
                error={errors.skills?.message}
              />
            )}
          />
        </FormSection>
      </ScrollView>

      {/* Picker Modal */}
      <Modal
        visible={pickerModal.visible}
        transparent
        animationType="slide"
        onRequestClose={closePicker}
      >
        <Pressable style={modalOverlayStyle} onPress={closePicker}>
          <Pressable style={modalContentStyle} onPress={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <View style={modalHeaderStyle}>
              <Text style={modalTitleStyle}>{pickerModal.title}</Text>
              <TouchableOpacity style={modalCloseButtonStyle} onPress={closePicker}>
                <FontAwesomeIcon
                  icon={faTimes}
                  size={20}
                  color={theme.colors.gray500}
                />
              </TouchableOpacity>
            </View>

            {/* Options List */}
            <FlatList
              data={pickerModal.options}
              keyExtractor={(item) => String(item.value)}
              renderItem={renderOptionItem}
              showsVerticalScrollIndicator={true}
              initialScrollIndex={
                pickerModal.currentValue
                  ? Math.max(
                      0,
                      pickerModal.options.findIndex(
                        (opt) => opt.value === pickerModal.currentValue,
                      ) - 2,
                    )
                  : 0
              }
              getItemLayout={(_, index) => ({
                length: 57,
                offset: 57 * index,
                index,
              })}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};
