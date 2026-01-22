import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Config from '../../core/config';

// ✅ CORRECT - Sends raw binary data
export const uploadToAWS = async (presignedUrl: string, imageUri: string) => {
  try {
    // Replace internal 'minio' hostname with Android emulator's host address
    // TODO: Remove this workaround once backend generates correct presigned URLs
    const resolvedUrl = presignedUrl.replace('://minio:', `://${Config.IP}:`);
    
    const filePath = imageUri.replace('file://', '');

    const response = await ReactNativeBlobUtil.fetch(
      'PUT', 
      resolvedUrl,
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
