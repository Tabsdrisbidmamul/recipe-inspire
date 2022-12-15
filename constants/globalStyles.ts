import { StyleSheet } from 'react-native';
import colors from './colors';

export const globalStyles = StyleSheet.create({
  shadows: {
    elevation: 2,

    shadowColor: colors.blacks.deep,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: { width: 3, height: 2 },
  },

  baseText: {
    fontFamily: 'nunito-regular',
    fontSize: 16,
  },

  baseHeaderText: {
    fontFamily: 'nunito-semibold',
    fontSize: 32,
  },

  baseContainerPaddingHorizontal: {
    paddingHorizontal: 16,
  },
});
