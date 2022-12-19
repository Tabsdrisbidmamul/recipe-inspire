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
  return (
    <View
      accessible
      accessibilityLabel="Card content container"
      accessibilityHint="Wrapper for content"
      style={[styles.card, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...globalStyles.baseCard,
    ...globalStyles.shadows,
  },
});
