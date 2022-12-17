import { Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  title: string;
}

/**
 * Content headers to be used in conjunction with content breaks
 * @param param0
 * @returns
 */
export default function ContentHeader({ title }: IProps) {
  return <Text style={[styles.header]}>{title}</Text>;
}

const styles = StyleSheet.create({
  header: {
    ...globalStyles.baseHeaderText,
  },
});
