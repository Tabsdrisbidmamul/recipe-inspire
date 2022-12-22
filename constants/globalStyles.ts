import { StyleSheet } from 'react-native';
import colors from './colors';

const color = colors.blacks.charcoal;

export const globalStyles = StyleSheet.create({
  shadows: {
    elevation: 2,

    shadowColor: colors.blacks.deep,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: { width: 3, height: 2 },
  },

  baseText: {
    fontFamily: 'nunito-medium',
    fontSize: 18,
    color,
  },

  baseHeaderText: {
    fontFamily: 'nunito-semibold',
    fontSize: 26,
    marginBottom: 18,
    color,
  },

  baseBorderRadius: {
    borderRadius: 100,
  },

  baseContentMargin: {
    marginBottom: 20,
  },

  headerH2: {
    fontFamily: 'nunito-medium',
    fontSize: 22,
    marginBottom: 12,
    color,
  },

  basePaddingHorizontal: {
    paddingHorizontal: 10,
  },

  basePaddingVertical: {
    paddingVertical: 16,
  },

  baseMarginHorizontal: {
    marginHorizontal: 10,
  },

  baseContainerPaddingHorizontal: {
    paddingHorizontal: 16,
  },

  baseContainerPaddingVertical: {
    paddingVertical: 16,
  },

  baseContainerMarginHorizontal: {
    marginHorizontal: 16,
  },

  baseContainerMarginVertical: {
    marginVertical: 16,
  },

  buttonBackgroundColor: {
    backgroundColor: colors.blacks.charcoal,
  },

  buttonTextColor: {
    color: colors.whites.pastel,
  },

  searchButtonBackgroundColor: {
    backgroundColor: colors.whites.pastel,
  },

  baseCard: {
    borderRadius: 12,
    backgroundColor: colors.whites.paleYellowLighter,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  basePill: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 25,
    borderColor: colors.blacks.charcoal,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },

  icon: {
    color: colors.blacks.charcoal,
    fontSize: 24,
  },

  circle: {
    height: 5,
    width: 5,
    backgroundColor: colors.whites.pastel,
    borderRadius: 100,
  },
});

export const globalTagStyles = {
  body: {
    ...globalStyles.baseText,
    maxWidth: 200,
    maxHeight: 200,
    fontSize: 16,
    // marginBottom: 18,
  },
};
