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
    <Pressable onPress={onPress} style={styles.button}>
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
    backgroundColor: colors.whites.pastel,
    ...globalStyles.shadows,
    ...globalStyles.baseBorderRadius,
  },

  buttonText: {
    ...globalStyles.baseText,
    // textTransform: 'uppercase',
  },
});
