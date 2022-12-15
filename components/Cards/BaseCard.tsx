import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  children: JSX.Element[] | JSX.Element;
  style?: StyleProp<ViewStyle>;
}

/**
 * Base card for content
 * @param props
 * @returns
 */
export default function BaseCard({ children, style }: IProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    ...globalStyles.baseCard,
    ...globalStyles.shadows,
  },
});
