import {Platform, Dimensions} from 'react-native';

export const isIOS = Platform.OS === 'ios';

export const {height, width} = Dimensions.get('window');

export const aspectRatio = height / width;
export const isiPad = aspectRatio < 1.6;

// Custom Fonts
export const fontFamily = {
  Regular: {fontFamily: 'Regular'},
  Light: {fontFamily: 'Light'},
  Medium: {fontFamily: 'Medium'},
  oBold: {fontFamily: 'Bold'},
};

// Font Sizes
export const fontSize = {
  xsmall: 10,
  small: 12,
  medium: 14,
  large: 18,
  xlarge: 22,
};

export const string = {
  addToCart: "Add To\nCart",
  discover: "Discover",
  stars: "Stars",
  add: "Add",
  cart: "Cart",
  profile: "Profile"
}
