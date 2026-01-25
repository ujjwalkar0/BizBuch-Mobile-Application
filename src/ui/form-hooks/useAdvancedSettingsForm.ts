import { useForm, UseFormReturn } from 'react-hook-form';
import { AdvancedSettingsFormValues } from '../form-types/AdvancedSettingsForm.types';

/**
 * Validation rules for advanced settings form
 * SOLID: Single Responsibility - Define validation rules only
 * SOLID: Open/Closed - Easy to extend validation rules
 */
export const advancedSettingsValidationRules = {
  ip: {
    required: 'IP address or URL is required',
    validate: (value: string) => {
      // Check if it's a valid IP address
      const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (ipPattern.test(value)) {
        const parts = value.split('.');
        const isValidIp = parts.every(part => {
          const num = parseInt(part, 10);
          return num >= 0 && num <= 255;
        });
        if (!isValidIp) {
          return 'Each IP segment must be between 0 and 255';
        }
        return true;
      }

      // Check if it's a valid URL/hostname
      const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?(\/.*)?$/;
      const localhostPattern = /^(https?:\/\/)?localhost(:\d+)?(\/.*)?$/;
      
      if (urlPattern.test(value) || localhostPattern.test(value)) {
        return true;
      }

      return 'Please enter a valid IP address (e.g., 192.168.0.5) or URL (e.g., example.com)';
    },
  },
  port: {
    required: 'Port is required',
    validate: (value: string) => {
      const num = parseInt(value, 10);
      if (isNaN(num)) return 'Port must be a number';
      if (num < 1 || num > 65535) return 'Port must be between 1 and 65535';
      return true;
    },
  },
};

// Type export for validation rules
export type AdvancedSettingsValidationRules = typeof advancedSettingsValidationRules;

/**
 * useAdvancedSettingsForm Hook
 * SOLID: Single Responsibility - Form setup and validation only
 * SOLID: Dependency Inversion - Depends on react-hook-form abstraction
 */
export const useAdvancedSettingsForm = (
  defaultValues: AdvancedSettingsFormValues,
): UseFormReturn<AdvancedSettingsFormValues> & {
  rules: AdvancedSettingsValidationRules;
} => {
  const form = useForm<AdvancedSettingsFormValues>({
    defaultValues,
    mode: 'onChange',
  });

  return {
    ...form,
    rules: advancedSettingsValidationRules,
  };
};
