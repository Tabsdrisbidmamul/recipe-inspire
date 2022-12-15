import { Pressable, StyleSheet, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { globalStyles } from '../../constants/globalStyles';
import colors from '../../constants/colors';

interface IProps {
  text: string;
}

export default function ButtonHorizontal({ text }: IProps) {
  return (
    <Pressable style={styles.button}>
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
