import { observer } from 'mobx-react-lite';
import React from 'react';
import { Pressable, TextInput, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../../constants/globalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import globalConstants from '../../constants/globalConstants';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  mode: 'button' | 'input';
}

/**
 * Search input - 2 variants one is the button to take us to the search screen. the other is an actual input which does the searching
 *
 * as there is only one we make this component point to the ingredients store for searching
 *
 * @params props
 * @returns
 */
export default observer(function SearchField({ mode }: IProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const height = insets.top + globalConstants.insetHeight;

  let content = <></>;

  function handleSearchButtonPress() {
    //@ts-ignore
    navigation.navigate('SearchResults');
  }

  switch (mode) {
    case 'button': {
      content = (
        <View style={styles.buttonAndCameraContainer}>
          <Pressable onPress={handleSearchButtonPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Search</Text>
            <Ionicons name="search" style={styles.icon} />
          </Pressable>

          <Pressable style={styles.iconContainer}>
            <Ionicons name="camera-outline" style={[styles.icon, styles.cameraIcon]} />
          </Pressable>
        </View>
      );
      break;
    }
    case 'input': {
      content = <></>;
    }
  }

  return <View style={[{ marginTop: height }]}>{content}</View>;
});

const styles = StyleSheet.create({
  buttonAndCameraContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...globalStyles.searchButtonBackgroundColor,
    ...globalStyles.basePaddingHorizontal,
    ...globalStyles.basePaddingVertical,
    ...globalStyles.baseBorderRadius,
    paddingHorizontal: 30,
    paddingVertical: 12,
    flex: 2,
  },
  icon: {
    ...globalStyles.icon,
  },
  buttonText: {
    ...globalStyles.baseText,
  },
  iconContainer: {
    marginLeft: 15,
    width: 50,
    height: 50,
    backgroundColor: colors.primary.darkBlue,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    color: colors.whites.pastel,

    fontSize: 35,
  },
});
