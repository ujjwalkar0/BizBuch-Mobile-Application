import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { useAddWorkExperienceForm } from '../form-hooks/useAddWorkExperienceForm';
import { useAddWorkExperienceMutation } from './useAddWorkExperienceMutation';
import {
  AddWorkExperienceFormValues,
  AddWorkExperienceRequestBody,
  EmploymentType,
} from '../form-types/AddWorkExperienceForm.types';
import { RootStackParamList } from '../../presentation/navigation/RootStackParamList';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Employment type options for picker
 */
export const EMPLOYMENT_TYPE_OPTIONS: { label: string; value: EmploymentType }[] = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
  { label: 'Freelance', value: 'freelance' },
];

/**
 * Month options for picker
 */
export const MONTH_OPTIONS = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
];

/**
 * Generate year options (from 1950 to current year)
 */
export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1950; year--) {
    years.push({ label: year.toString(), value: year });
  }
  return years;
};

/**
 * useAddWorkExperienceScreen Hook
 * SOLID Principles:
 * - Single Responsibility: Screen-level business logic
 * - Open/Closed: Extended through form hook
 * - Dependency Inversion: Depends on abstractions
 */
export const useAddWorkExperienceScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { control, handleSubmit, watch, setValue, formState, rules } =
    useAddWorkExperienceForm();
  const mutation = useAddWorkExperienceMutation();

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
        // Clear end date if marking as current
        setValue('end_year', undefined);
        setValue('end_month', undefined);
      }
    },
    [setValue],
  );

  const handleSubmitForm = useCallback(
    (data: AddWorkExperienceFormValues) => {
      const requestBody: AddWorkExperienceRequestBody = {
        company_name: data.company_name,
        job_title: data.job_title,
        location: data.location,
        employment_type: data.employment_type,
        start_year: data.start_year,
        start_month: data.start_month,
        end_year: data.is_current ? undefined : data.end_year,
        end_month: data.is_current ? undefined : data.end_month,
        is_current: data.is_current,
        description: data.description,
        skills: data.skills,
      };

      mutation.mutate(requestBody, {
        onSuccess: () => {
          Alert.alert('Success', 'Work experience added successfully', [
            { text: 'OK', onPress: () => navigation.goBack() },
          ]);
        },
        onError: (error) => {
          Alert.alert('Error', error.message || 'Failed to add work experience');
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
    monthOptions: MONTH_OPTIONS,
    employmentTypeOptions: EMPLOYMENT_TYPE_OPTIONS,

    // Actions
    onSubmit,
    handleGoBack,
    handleToggleIsCurrent,
    setValue,
  };
};
