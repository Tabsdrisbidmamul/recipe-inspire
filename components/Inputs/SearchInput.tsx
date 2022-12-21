import React, { createRef } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';
import { _debounce } from '../../helpers/debounce';
import DelayInput from 'react-native-debounce-input';

/**
 * Search input - debounced, will update the store for every keystroke
 * @returns
 */
export default observer(function SearchInput() {
  const navigation = useNavigation();

  const inputRef = createRef();
  const { ingredientsStore } = useStore();
  const { searchValue, setSearchValue } = ingredientsStore;

  function handleBackButtonPress() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  async function handleInputChange(value: string) {
    setSearchValue(value);
  }

  return (
    <View style={styles.textInputContainer}>
      <Pressable
        accessible
        accessibilityLabel="Go back"
        accessibilityHint="Navigates to the previous screen"
        onPress={handleBackButtonPress}
        style={styles.backContainer}
      >
        <Ionicons name="arrow-back-sharp" style={[styles.icon, styles.backIcon]} />
      </Pressable>
      <DelayInput
        accessible
        accessibilityLabel="Search input"
        accessibilityHint="Tap to open keyboard and search"
        value={searchValue}
        //@ts-ignore
        inputRef={inputRef}
        //@ts-ignore
        onChangeText={(value) => handleInputChange(value as string)}
        delayTimeout={500}
        style={styles.textInput}
        autoFocus
        placeholder="Search"
        placeholderTextColor={colors.blacks.charcoal}
      />
      <Ionicons name="search" style={[styles.icon, styles.searchIcon]} />
    </View>
  );
});

const styles = StyleSheet.create({
  textInputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    ...globalStyles.baseContentMargin,
  },
  backContainer: {
    backgroundColor: colors.whites.pastel,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },

  icon: {
    ...globalStyles.icon,
  },
  searchIcon: {
    position: 'absolute',
    top: 12,
    right: 20,
  },
  backIcon: {
    marginLeft: 10,
  },

  textInput: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    ...globalStyles.searchButtonBackgroundColor,
    paddingHorizontal: 30,
    paddingVertical: 12,
    ...globalStyles.baseText,
    flex: 2,
  },
});
