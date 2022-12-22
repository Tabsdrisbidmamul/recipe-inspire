import { StyleProp, View, ViewStyle } from 'react-native';

interface IProps {
  children: JSX.Element[] | JSX.Element;
  style?: StyleProp<ViewStyle>;
}

export default function Row({ children, style }: IProps) {
  return <View style={[{ flexDirection: 'row' }, style]}>{children}</View>;
}
