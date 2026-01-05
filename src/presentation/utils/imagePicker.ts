import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Platform, PermissionsAndroid, Alert } from "react-native";

const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs access to your camera",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true; // iOS handles via Info.plist
};

export const pickFromCamera = async (): Promise<string | null> => {
  const hasPermission = await requestCameraPermission();
  
  if (!hasPermission) {
    Alert.alert('Permission Denied', 'Camera permission is required');
    return null;
  }

  const result = await launchCamera({
    mediaType: "photo",
    quality: 0.8,
    saveToPhotos: true,
    cameraType: 'back', // Add this explicitly
  });

  console.log('Camera result:', result); // Debug log

  if (result.didCancel) {
    console.log('User cancelled camera');
    return null;
  }

  if (result.errorCode) {
    console.log('Camera Error:', result.errorCode, result.errorMessage);
    Alert.alert('Camera Error', result.errorMessage || 'Failed to open camera');
    return null;
  }

  if (!result.assets?.length) return null;

  return result.assets[0].uri ?? null;
};

export const pickFromGallery = async (): Promise<string | null> => {
  const result = await launchImageLibrary({
    mediaType: "photo",
    quality: 0.8,
    selectionLimit: 1,
  });

  if (result.didCancel || !result.assets?.length) return null;

  return result.assets[0].uri ?? null;
};
