import React from 'react';
import { AddWorkExperienceScreenTemplate } from '../components/templates/AddWorkExperienceScreenTemplate';
import { useAddWorkExperienceScreen } from './hooks/useAddWorkExperienceScreen';


export const AddWorkExperienceScreen: React.FC = () => {
  const {
    // Form
    control,
    errors,
    rules,

    // State
    isCurrent,
    isLoading,
    isSubmitDisabled,

    // Options
    yearOptions,
    monthOptions,
    employmentTypeOptions,

    // Actions
    onSubmit,
    handleGoBack,
    handleToggleIsCurrent,
  } = useAddWorkExperienceScreen();

  return (
    <AddWorkExperienceScreenTemplate
      // Form
      control={control}
      errors={errors}
      rules={rules}
      // State
      isCurrent={isCurrent}
      isLoading={isLoading}
      isSubmitDisabled={isSubmitDisabled}
      // Options
      yearOptions={yearOptions}
      monthOptions={monthOptions}
      employmentTypeOptions={employmentTypeOptions}
      // Actions
      onSubmit={onSubmit}
      onBack={handleGoBack}
      onToggleIsCurrent={handleToggleIsCurrent}
    />
  );
};
