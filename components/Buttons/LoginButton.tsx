import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  onPress?: (...args: any) => any;
}

/**
 * Render in a login button
 * @param props
 * @returns
 */
export default function LoginButton({ onPress }: IProps) {
  return (
    <Pressable
      accessible
      accessibilityLabel="Login button"
      accessibilityHint="Navigates to login screen and form"
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Log in</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    ...globalStyles.buttonBackgroundColor,
    ...globalStyles.shadows,
    ...globalStyles.baseBorderRadius,
  },

  buttonText: {
    ...globalStyles.baseText,
    ...globalStyles.buttonTextColor,
  },
});
