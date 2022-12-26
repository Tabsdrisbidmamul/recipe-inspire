import Modal from 'react-native-modal';
import { StatusBar as SB } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import React from 'react';
import { Dimensions, Platform, ScrollView, View, StyleSheet, Text } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  toggleModal: (...args: any) => any;
  isModalVisible: boolean;
}

export default function ModalSlideup({ toggleModal, isModalVisible }: IProps) {
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
              <Text style={styles.text}>Test</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    ...globalStyles.baseText,
    color: colors.whites.pastel,
  },

  modalContainer: {
    flex: 1,
    marginTop: Dimensions.get('screen').height / 4,
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
});
