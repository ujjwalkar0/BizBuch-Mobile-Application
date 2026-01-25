import React from 'react';
import { AddEducationScreenTemplate } from '../components/templates/AddEducationScreenTemplate';
import { useAddEducationScreen } from '../../ui/hooks/useAddEducationScreen';

/**
 * AddEducationScreen Page
 * Atomic Design: Page - Final screen with real data
 * SOLID Principles:
 * - Single Responsibility: Connect data to template
 * - Open/Closed: Extended through hook and template
 * - Dependency Inversion: Depends on abstractions
 */
export const AddEducationScreen: React.FC = () => {
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
    degreeOptions,

    // Actions
    onSubmit,
    handleGoBack,
    handleToggleIsCurrent,
  } = useAddEducationScreen();

  return (
    <AddEducationScreenTemplate
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
      degreeOptions={degreeOptions}
      // Actions
      onSubmit={onSubmit}
      onBack={handleGoBack}
      onToggleIsCurrent={handleToggleIsCurrent}
    />
  );
};
