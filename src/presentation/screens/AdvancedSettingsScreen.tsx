import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { useAdvancedSettingsScreen } from '../../ui/hooks/useAdvancedSettingsScreen';
import { AdvancedSettingsScreenTemplate } from '../components/templates/AdvancedSettingsScreenTemplate';

type AdvancedSettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AdvancedSettings'
>;

/**
 * AdvancedSettingsScreen
 * SOLID: Single Responsibility - Compose hook and template
 * SOLID: Dependency Inversion - Depends on abstractions (hook, template)
 * Atomic Design: Screen - Connects business logic to UI template
 */
export const AdvancedSettingsScreen: React.FC<AdvancedSettingsScreenProps> = () => {
  const {
    control,
    errors,
    rules,
    isLoading,
    isSaving,
    previewUrl,
    isSubmitDisabled,
    onSubmit,
    handleGoBack,
    handleReset,
  } = useAdvancedSettingsScreen();

  return (
    <AdvancedSettingsScreenTemplate
      control={control}
      errors={errors}
      rules={rules}
      isLoading={isLoading}
      isSaving={isSaving}
      previewUrl={previewUrl}
      isSubmitDisabled={isSubmitDisabled}
      onSubmit={onSubmit}
      onGoBack={handleGoBack}
      onReset={handleReset}
    />
  );
};
