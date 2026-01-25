import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { useAddEducationForm } from '../form-hooks/useAddEducationForm';
import { useAddEducationMutation } from './useAddEducationMutation';
import {
  AddEducationFormValues,
  AddEducationRequestBody,
} from '../form-types/AddEducationForm.types';
import { RootStackParamList } from '../../presentation/navigation/RootStackParamList';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Degree type options for picker
 */
export const DEGREE_OPTIONS = [
  { label: 'High School Diploma', value: 'High School Diploma' },
  { label: 'Associate Degree', value: 'Associate Degree' },
  { label: "Bachelor's Degree", value: "Bachelor's Degree" },
  { label: "Master's Degree", value: "Master's Degree" },
  { label: 'Doctorate (Ph.D.)', value: 'Doctorate' },
  { label: 'Certificate', value: 'Certificate' },
  { label: 'Diploma', value: 'Diploma' },
  { label: 'Other', value: 'Other' },
];

/**
 * Generate year options (from 1950 to current year + 10 for expected graduation)
 */
export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear + 10; year >= 1950; year--) {
    years.push({ label: year.toString(), value: year });
  }
  return years;
};

/**
 * useAddEducationScreen Hook
 * SOLID Principles:
 * - Single Responsibility: Screen-level business logic
 * - Open/Closed: Extended through form hook
 * - Dependency Inversion: Depends on abstractions
 */
export const useAddEducationScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { control, handleSubmit, watch, setValue, formState, rules } =
    useAddEducationForm();
  const mutation = useAddEducationMutation();

  // Watch values for conditional logic
  const isCurrent = watch('is_current');
  const { errors, isValid, isDirty } = formState;

  // Year options (memoized)
  const yearOptions = useMemo(() => generateYearOptions(), []);

  // Derived state
  const isSubmitDisabled = useMemo(
    () => !isValid || mutation.isPending,
    [isValid, mutation.isPending],
  );

  const isLoading = mutation.isPending;

  // Handlers
  const handleGoBack = useCallback(() => {
    if (isDirty) {
      Alert.alert(
        'Discard Changes?',
        'You have unsaved changes. Are you sure you want to go back?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() },
        ],
      );
    } else {
      navigation.goBack();
    }
  }, [navigation, isDirty]);

  const handleToggleIsCurrent = useCallback(
    (value: boolean) => {
      setValue('is_current', value, { shouldValidate: true });
      if (value) {
        // Clear end year if marking as current
        setValue('end_year', undefined);
      }
    },
    [setValue],
  );

  const handleSubmitForm = useCallback(
    (data: AddEducationFormValues) => {
      const requestBody: AddEducationRequestBody = {
        name: data.school_name,
        degrees: data.degree,
        field_of_study: data.field_of_study,
        start_year: data.start_year,
        end_year: data.is_current ? undefined : data.end_year,
        is_current: data.is_current,
        description: data.description,
      };

      mutation.mutate(requestBody, {
        onSuccess: () => {
          Alert.alert('Success', 'Education added successfully', [
            { text: 'OK', onPress: () => navigation.goBack() },
          ]);
        },
        onError: (error) => {
          Alert.alert('Error', error.message || 'Failed to add education');
        },
      });
    },
    [mutation, navigation],
  );

  const onSubmit = handleSubmit(handleSubmitForm);

  return {
    // Form
    control,
    errors,
    rules,
    isValid,

    // State
    isCurrent,
    isLoading,
    isSubmitDisabled,

    // Options
    yearOptions,
    degreeOptions: DEGREE_OPTIONS,

    // Actions
    onSubmit,
    handleGoBack,
    handleToggleIsCurrent,
    setValue,
  };
};
