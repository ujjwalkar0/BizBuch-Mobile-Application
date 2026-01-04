import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const usePasswordVisibility = () => {
  const [isHidden, setIsHidden] = useState(true);
  
  const toggleVisibility = () => setIsHidden(prev => !prev);
  
  const icon = isHidden ? faEyeSlash : faEye;
  
  return {
    isHidden,
    icon,
    toggleVisibility
  };
};
