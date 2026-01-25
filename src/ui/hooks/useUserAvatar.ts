import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBlobUtil from 'react-native-blob-util';

const AVATAR_FILENAME = 'user_avatar.jpg';

/**
 * useUserAvatar Hook
 * SOLID: Single Responsibility - Provides locally cached user avatar
 * Downloads avatar image and stores it locally for offline access
 */
export const useUserAvatar = () => {
  const [avatarUri, setAvatarUri] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const getLocalAvatarPath = () => {
    return `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${AVATAR_FILENAME}`;
  };

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const localPath = getLocalAvatarPath();
        const exists = await ReactNativeBlobUtil.fs.exists(localPath);
        
        if (exists) {
          // Use locally stored avatar
          setAvatarUri(`file://${localPath}`);
        } else {
          // Check if we have a URL to download from
          const cachedUrl = await AsyncStorage.getItem('userProfilePhoto');
          if (cachedUrl) {
            await downloadAndCacheAvatar(cachedUrl);
          }
        }
      } catch (error) {
        console.error('Error loading user avatar:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAvatar();
  }, []);

  /**
   * Downloads avatar from URL and saves it locally
   */
  const downloadAndCacheAvatar = async (url: string): Promise<boolean> => {
    try {
      const localPath = getLocalAvatarPath();
      
      // Download the image
      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: localPath,
      }).fetch('GET', url);

      if (res.info().status === 200) {
        // Save the original URL for reference
        await AsyncStorage.setItem('userProfilePhoto', url);
        setAvatarUri(`file://${localPath}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error downloading avatar:', error);
      return false;
    }
  };

  /**
   * Updates avatar with a new URL - downloads and caches locally
   */
  const updateAvatar = async (newUrl: string) => {
    setIsLoading(true);
    try {
      // Delete old cached image
      const localPath = getLocalAvatarPath();
      const exists = await ReactNativeBlobUtil.fs.exists(localPath);
      if (exists) {
        await ReactNativeBlobUtil.fs.unlink(localPath);
      }
      
      // Download and cache new avatar
      await downloadAndCacheAvatar(newUrl);
    } catch (error) {
      console.error('Error updating avatar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Refreshes avatar by re-downloading from stored URL
   */
  const refreshAvatar = async () => {
    try {
      const cachedUrl = await AsyncStorage.getItem('userProfilePhoto');
      if (cachedUrl) {
        await updateAvatar(cachedUrl);
      }
    } catch (error) {
      console.error('Error refreshing user avatar:', error);
    }
  };

  /**
   * Clears locally cached avatar
   */
  const clearAvatar = async () => {
    try {
      const localPath = getLocalAvatarPath();
      const exists = await ReactNativeBlobUtil.fs.exists(localPath);
      if (exists) {
        await ReactNativeBlobUtil.fs.unlink(localPath);
      }
      await AsyncStorage.removeItem('userProfilePhoto');
      setAvatarUri('');
    } catch (error) {
      console.error('Error clearing avatar:', error);
    }
  };

  return {
    avatarUri: avatarUri,
    isLoading,
    updateAvatar,
    refreshAvatar,
    clearAvatar,
  };
};
