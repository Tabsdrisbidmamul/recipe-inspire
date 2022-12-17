import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { globalStyles } from '../../constants/globalStyles';
import colors from '../../constants/colors';

interface IProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  onPress: (...args: any) => any;
}

/**
 * Button that takes 100% width - text and icon are justified
 * @param param0
 * @returns
 */
export default function ButtonHorizontal({ text, onPress, style }: IProps) {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{text}</Text>
      <Entypo name="chevron-small-right" style={styles.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  buttonText: {
    ...globalStyles.baseText,
  },

  icon: {
    color: colors.blacks.charcoal,
    fontSize: 24,
  },
});
