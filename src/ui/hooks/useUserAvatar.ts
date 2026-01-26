import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBlobUtil from 'react-native-blob-util';

const AVATAR_FILENAME = 'user_avatar.jpg';
const AVATAR_DOWNLOADED_URL_KEY = 'userAvatarDownloadedUrl';

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
        const currentProfileUrl = await AsyncStorage.getItem('userProfilePhoto');
        const downloadedUrl = await AsyncStorage.getItem(AVATAR_DOWNLOADED_URL_KEY);
        
        // Check if cached file exists and was downloaded from the current URL
        if (exists && currentProfileUrl && currentProfileUrl === downloadedUrl) {
          // Use locally stored avatar (URL hasn't changed)
          setAvatarUri(`file://${localPath}`);
        } else if (currentProfileUrl) {
          // URL changed or no cached file - delete old and download new
          if (exists) {
            await ReactNativeBlobUtil.fs.unlink(localPath);
          }
          await downloadAndCacheAvatar(currentProfileUrl);
        } else if (exists) {
          // No current URL but file exists - clear stale cache
          await ReactNativeBlobUtil.fs.unlink(localPath);
          await AsyncStorage.removeItem(AVATAR_DOWNLOADED_URL_KEY);
          setAvatarUri('');
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
        // Track which URL was actually downloaded to the local file
        await AsyncStorage.setItem(AVATAR_DOWNLOADED_URL_KEY, url);
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
   * Use this when user uploads a new profile photo
   */
  const updateAvatar = async (newUrl: string) => {
    setIsLoading(true);
    setAvatarUri(''); // Clear current avatar to trigger UI refresh
    try {
      // Delete old cached image
      const localPath = getLocalAvatarPath();
      const exists = await ReactNativeBlobUtil.fs.exists(localPath);
      if (exists) {
        await ReactNativeBlobUtil.fs.unlink(localPath);
      }
      // Clear old downloaded URL tracking
      await AsyncStorage.removeItem(AVATAR_DOWNLOADED_URL_KEY);
      
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
      await AsyncStorage.removeItem(AVATAR_DOWNLOADED_URL_KEY);
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
