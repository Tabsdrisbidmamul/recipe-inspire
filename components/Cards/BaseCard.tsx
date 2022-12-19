import { StyleProp, StyleSheet, View, ViewStyle, Pressable } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  children: JSX.Element[] | JSX.Element;
  style?: StyleProp<ViewStyle>;
  mode?: 'content' | 'link';
  onPress?: (...args: any) => any;
}

/**
 * Base card for content or touchable card for navigation
 * @param props
 * @returns
 */
export default function BaseCard({ children, style, mode, onPress }: IProps) {
  return mode === 'content' ? (
    <View
      accessible
      accessibilityLabel="Card content container"
      accessibilityHint="Wrapper for content"
      style={[styles.card, style]}
    >
      {children}
    </View>
  ) : (
    <Pressable
      onPress={onPress}
      accessible
      accessibilityLabel="Touchable Card"
      accessibilityHint="Navigate to recipe"
      style={[styles.card, style]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    ...globalStyles.baseCard,
    ...globalStyles.shadows,
  },
});
