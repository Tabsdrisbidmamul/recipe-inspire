import Modal from 'react-native-modal';
import { StatusBar as SB } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import React from 'react';
import { Dimensions, Platform, ScrollView, View, StyleSheet, Text, Pressable, Image } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';
import globalConstants from '../../constants/globalConstants';
import ImageCard from '../Cards/ImageCard';
import { useSwipe } from '../../hooks/useSwipe';

interface IProps {
  toggleModal: (...args: any) => any;
  isModalVisible: boolean;
}

export default observer(function CameraModal({ toggleModal, isModalVisible }: IProps) {
  const { ingredientsStore } = useStore();
  const { scannedIngredients, removedScannedIngredients } = ingredientsStore;

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

  function onSwipeLeft(index: number) {
    console.log('SWIPE_LEFT index: ', index);
  }

  function onSwipeRight(index: number) {
    console.log('SWIPE_RIGHT index ', index);
  }

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
        <View style={styles.headerContainer}>
          <Ionicons onPress={toggleModal} name="close" size={32} color={colors.whites.pastel} />
        </View>

        <View style={styles.bodyContainer}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }} onStartShouldSetResponder={() => true}>
              <View style={styles.acceptContainer}>
                <Text style={styles.header}>Ingredients to include</Text>
                <View>
                  {scannedIngredients.map((el, i) => (
                    <View
                      onTouchStart={(e) => onTouchStart(e, i)}
                      onTouchEnd={(e) => onTouchEnd(e, i)}
                      style={styles.resultContainer}
                      key={i}
                    >
                      <ImageCard
                        readyInMinutes={0}
                        servings={0}
                        title={el.ingredient}
                        uri={el.photo.uri}
                        showInformation={false}
                      />
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.notAcceptContainer}>
                <Text style={styles.header}>Ingredients to not include</Text>
                <View>
                  {removedScannedIngredients.map((el, i) => (
                    <View style={styles.resultContainer} key={i}>
                      <ImageCard
                        readyInMinutes={0}
                        servings={0}
                        title={el.ingredient}
                        uri={el.photo.uri}
                        showInformation={false}
                      />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>

          <Pressable
            accessible
            accessibilityLabel="Done button"
            accessibilityHint="Navigates to the recipe search screen"
            style={styles.doneButton}
          >
            <Text style={[styles.text, { textAlign: 'center' }]}>Done</Text>
          </Pressable>
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

  doneButton: {
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: globalConstants.cardBorderRadius,
    backgroundColor: colors.primary.green,
    marginBottom: 30,
    marginRight: 5,
    alignSelf: 'flex-end',
  },

  modalContainer: {
    flex: 1,
    marginTop: Dimensions.get('screen').height / 6,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  headerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: colors.blacks.charcoal,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    alignItems: 'flex-end',
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

  resultContainer: {
    flexDirection: 'row',
    borderRadius: globalConstants.cardBorderRadius,
    backgroundColor: colors.whites.pastel,
    marginBottom: 20,
  },

  image: {
    width: 100,
    height: 150,
    aspectRatio: 1 / 1,
    resizeMode: 'cover',
    borderTopLeftRadius: globalConstants.cardBorderRadius,
    borderBottomLeftRadius: globalConstants.cardBorderRadius,
    flex: 2,
  },

  modalText: {
    color: colors.blacks.charcoal,
    flex: 1,
  },
});
