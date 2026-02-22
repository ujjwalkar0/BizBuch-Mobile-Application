import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBlobUtil from 'react-native-blob-util';

const AVATAR_FILENAME = 'user_avatar.jpg';
const AVATAR_DOWNLOADED_URL_KEY = 'userAvatarDownloadedUrl';

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
        const currentProfileUrl = await AsyncStorage.getItem(
          'userProfilePhoto',
        );
        const downloadedUrl = await AsyncStorage.getItem(
          AVATAR_DOWNLOADED_URL_KEY,
        );

        if (
          exists &&
          currentProfileUrl &&
          currentProfileUrl === downloadedUrl
        ) {
          setAvatarUri(`file://${localPath}`);
        } else if (currentProfileUrl) {
          if (exists) {
            await ReactNativeBlobUtil.fs.unlink(localPath);
          }
          await downloadAndCacheAvatar(currentProfileUrl);
        } else if (exists) {
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

  const downloadAndCacheAvatar = async (url: string): Promise<boolean> => {
    try {
      const localPath = getLocalAvatarPath();

      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: localPath,
      }).fetch('GET', url);

      if (res.info().status === 200) {
        await AsyncStorage.setItem('userProfilePhoto', url);
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

  const updateAvatar = async (newUrl: string) => {
    setIsLoading(true);
    setAvatarUri('');
    try {
      const localPath = getLocalAvatarPath();
      const exists = await ReactNativeBlobUtil.fs.exists(localPath);
      if (exists) {
        await ReactNativeBlobUtil.fs.unlink(localPath);
      }
      await AsyncStorage.removeItem(AVATAR_DOWNLOADED_URL_KEY);
      await downloadAndCacheAvatar(newUrl);
    } catch (error) {
      console.error('Error updating avatar:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
