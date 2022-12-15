import { StyleSheet, View } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  children: JSX.Element;
}

export default function BaseCard({ children }: IProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    ...globalStyles.baseCard,
    ...globalStyles.shadows,
  },
});
