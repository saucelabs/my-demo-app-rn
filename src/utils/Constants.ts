import {Dimensions, Platform} from 'react-native';

export const IS_IOS = Platform.OS.toLowerCase() === 'ios';
export const PLATFORM_VERSION = Platform.Version;
export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} =
  Dimensions.get('window');
// A basic helper to design your react-native app for the iPhone X, XS, XS Max & XR
export const HAS_IOS_NOTCH =
  IS_IOS &&
  (WINDOW_WIDTH === 812 ||
    WINDOW_HEIGHT === 812 ||
    WINDOW_WIDTH === 896 ||
    WINDOW_HEIGHT === 896 ||
    WINDOW_WIDTH === 844 ||
    WINDOW_HEIGHT === 844);
export const MUSEO_SANS_300 = IS_IOS ? 'MuseoSans-300' : 'MuseoSans_300';
export const MUSEO_SANS_500 = IS_IOS ? 'MuseoSans-500' : 'MuseoSans_500';
export const MUSEO_SANS_700 = IS_IOS ? 'MuseoSans-700' : 'MuseoSans_700';
export const VALID_PASSWORD = '10203040';
export enum USERNAMES_ENUM {
  STANDARD_USER = 'bob@example.com',
  LOCKED_OUT_USER = 'alice@example.com',
}
export const VALID_USERNAMES = [
  USERNAMES_ENUM.STANDARD_USER,
  USERNAMES_ENUM.LOCKED_OUT_USER,
];
