import Modal from 'react-native-modal';
import { StatusBar as SB } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, ScrollView, View, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';
import { useSwipe } from '../../hooks/useSwipe';
import IngredientsContent from '../Content/IngredientsContent';
import DoneButton from '../Buttons/DoneButtton';
import { useNavigation } from '@react-navigation/native';
import { ingredientsMode as IngredientsMode } from '../../types/ingredientsMode.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DraggableLine from '../Line/DraggableLine';

interface IProps {
  toggleModal: (...args: any) => any;
  isModalVisible: boolean;
  mode: IngredientsMode;
}

export default observer(function CameraModal({ toggleModal, isModalVisible, mode }: IProps) {
  // hack: re-render on every swipe
  const [count, setCount] = useState(0);

  const insets = useSafeAreaInsets();
  const { ingredientsStore } = useStore();
  const {
    scannedIngredients,
    removedScannedIngredients,
    removeScannedIngredientAndPushToRemoveList,
    removeScannedIngredientAndPushToScannedList,
    fetchResults,
  } = ingredientsStore;

  const navigation = useNavigation();
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

  function onSwipeLeft(index: number, mode: IngredientsMode) {
    // We only remove from the include class
    if (mode === 'not-include') return;

    removeScannedIngredientAndPushToRemoveList(index);
    setCount(count + 1);
  }

  function onSwipeRight(index: number, mode: IngredientsMode) {
    // We only add from the remove class
    if (mode === 'include') return;

    removeScannedIngredientAndPushToScannedList(index);
    setCount(count + 1);
  }

  async function navigateToSearchResultsScreen() {
    toggleModal();
    // do an eager search - to force the search results screen to have content
    await fetchResults();

    //@ts-ignore
    navigation.navigate('SearchResults');
  }

  // hack: force re-render when swiping on ingredients
  useEffect(() => {}, [count]);

  // const paddingTop = insets.top;

  return (
    <Modal
      swipeDirection={'down'}
      onSwipeComplete={toggleModal}
      hasBackdrop={true}
      style={{ margin: 0, padding: 0 }}
      backdropColor="rgba(0, 0, 0, 0.7)"
      isVisible={isModalVisible}
      propagateSwipe
      onBackdropPress={toggleModal}
      deviceHeight={Dimensions.get('screen').height}
    >
      {Platform.OS === 'android' ? <SB style="light" /> : null}
      <View style={styles.modalContainer}>
        <View style={[styles.headerContainer]}>
          <DraggableLine />
        </View>

        <View style={styles.bodyContainer}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }} onStartShouldSetResponder={() => true}>
              {mode === 'include' ? (
                <View style={styles.acceptContainer}>
                  <IngredientsContent
                    title="Ingredients to include"
                    ingredients={scannedIngredients}
                    onTouchEnd={onTouchEnd}
                    onTouchStart={onTouchStart}
                    mode="include"
                  />
                </View>
              ) : (
                <View style={styles.notAcceptContainer}>
                  <IngredientsContent
                    title="Ingredients to not include"
                    ingredients={removedScannedIngredients}
                    onTouchEnd={onTouchEnd}
                    onTouchStart={onTouchStart}
                    mode="not-include"
                  />
                </View>
              )}
            </View>
          </ScrollView>

          {mode === 'include' ? <DoneButton onPress={navigateToSearchResultsScreen} /> : null}
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  text: {
    ...globalStyles.baseText,
    color: colors.whites.pastel,
  },
  header: {
    ...globalStyles.headerH2,
    color: colors.whites.pastel,
  },

  modalContainer: {
    flex: 1,
    marginTop: Dimensions.get('screen').height / 4,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: colors.blacks.charcoal,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    alignItems: 'center',
  },
  bodyContainer: {
    backgroundColor: colors.blacks.charcoal,
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  acceptContainer: {
    marginBottom: 50,
  },

  notAcceptContainer: {},
});
