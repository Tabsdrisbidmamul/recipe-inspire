import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  children: JSX.Element[] | JSX.Element;
  numRows: number;
  style?: StyleProp<ViewStyle>;
}

export default function Column({ children, numRows, style }: IProps) {
  return <View style={[styles[`${numRows}col`], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  '1col': {
    flex: 1,
  },
  '2col': {
    flex: 2,
  },
  '3col': {
    flex: 3,
  },
  '4col': {
    flex: 4,
  },
}) as { [key: string]: {} };
