import React from 'react';
import { View, StyleSheet } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  children: JSX.Element[] | JSX.Element;
}

/**
 * Base content wrapper which applies styles around the container
 * @param param0
 * @returns
 */
export default function Content({ children }: IProps) {
  return <View style={styles.content}>{children}</View>;
}

const styles = StyleSheet.create({
  content: {
    ...globalStyles.baseContentMargin,
  },
});
