import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  onPress?: (...args: any) => any;
  message: string;
  mode: 'login' | 'logout';
}

/**
 * Render in a login button
 * @param props
 * @returns
 */
export default function AuthButton({ onPress, message, mode }: IProps) {
  async function handleButtonPressed() {
    onPress!().then();
  }

  return mode === 'login' ? (
    <Pressable
      accessible
      accessibilityLabel="Login button"
      accessibilityHint="Navigates to login screen and form"
      onPress={handleButtonPressed}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{message}</Text>
    </Pressable>
  ) : (
    <Pressable
      accessible
      accessibilityLabel="Logout button"
      accessibilityHint="Log user out"
      onPress={handleButtonPressed}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{message}</Text>
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
