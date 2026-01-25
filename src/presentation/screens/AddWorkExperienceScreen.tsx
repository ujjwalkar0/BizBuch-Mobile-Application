import React from 'react';
import { AddWorkExperienceScreenTemplate } from '../components/templates/AddWorkExperienceScreenTemplate';
import { useAddWorkExperienceScreen } from '../../ui/hooks/useAddWorkExperienceScreen';

/**
 * AddWorkExperienceScreen Page
 * Atomic Design: Page - Final screen with real data
 * SOLID Principles:
 * - Single Responsibility: Connect data to template
 * - Open/Closed: Extended through hook and template
 * - Dependency Inversion: Depends on abstractions
 */
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
