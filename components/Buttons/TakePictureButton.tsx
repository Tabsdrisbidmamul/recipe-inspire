import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

interface IProps {
  handlePictureTaken: (...args: any) => any;
}

export default function TakePictureButton({ handlePictureTaken }: IProps) {
  return (
    <Pressable
      accessible
      accessibilityLabel="Camera Button"
      accessibilityHint="Takes a picture"
      style={styles.pressableButton}
      onPress={handlePictureTaken}
    >
      <View style={styles.button}>
        <View style={styles.innerButton}></View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableButton: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    maxWidth: 500,
  },
  button: {
    width: 90,
    height: 90,
    borderRadius: 100,
    // padding: 10,
    borderColor: colors.whites.pastel,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: colors.whites.pastel,
  },
});
