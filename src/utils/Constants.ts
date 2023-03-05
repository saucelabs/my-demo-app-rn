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
export const FONTS = {
  DM_MONO_ITALIC: 'DMMono-Italic',
  DM_MONO_LIGHT: 'DMMono-Light',
  DM_MONO_LIGHT_ITALIC: 'DMMono-LightItalic',
  DM_MONO_MEDIUM: 'DMMono-Medium',
  DM_MONO_MEDIUM_ITALIC: 'DMMono-MediumItalic',
  DM_MONO_REGULAR: 'DMMono-Regular',
  DM_SANS_BOLD: 'DMSans-Bold',
  DM_SANS_BOLD_ITALIC: 'DMSans-BoldItalic',
  DM_SANS_ITALIC: 'DMSans-Italic',
  DM_SANS_MEDIUM: 'DMSans-Medium',
  DM_SANS_MEDIUM_ITALIC: 'DMSans-MediumItalic',
  DM_SANS_REGULAR: 'DMSans-Regular',
};

export const VALID_PASSWORD = '10203040';
export enum USERNAMES_ENUM {
  STANDARD_USER = 'bob@example.com',
  LOCKED_OUT_USER = 'alice@example.com',
}
export const VALID_USERNAMES = [
  USERNAMES_ENUM.STANDARD_USER,
  USERNAMES_ENUM.LOCKED_OUT_USER,
];
