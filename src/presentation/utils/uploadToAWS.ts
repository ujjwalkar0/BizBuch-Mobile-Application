import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBlobUtil from 'react-native-blob-util';

// ✅ CORRECT - Sends raw binary data
export const uploadToAWS = async (presignedUrl: string, imageUri: string) => {
  try {
    const filePath = imageUri.replace('file://', '');

    const response = await ReactNativeBlobUtil.fetch(
      'PUT', 
      presignedUrl,
      {
        'Content-Type': 'image/jpeg',
      },
      ReactNativeBlobUtil.wrap(filePath)
    );
    return response.info().status === 200;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
