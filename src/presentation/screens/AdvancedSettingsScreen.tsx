import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { AdvancedSettingsScreenTemplate } from '../components/templates/AdvancedSettingsScreenTemplate';
import { useAdvancedSettingsScreen } from './hooks/useAdvancedSettingsScreen';

type AdvancedSettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AdvancedSettings'
>;


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
