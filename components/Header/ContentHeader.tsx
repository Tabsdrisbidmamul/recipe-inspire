import { Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();

  const height = insets.top + 15;

  return <Text style={[styles.header, { paddingTop: height }]}>{title}</Text>;
}

const styles = StyleSheet.create({
  header: {
    ...globalStyles.baseHeaderText,
  },
});
