import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { StyleSheet, Dimensions, Platform, ScrollView, View, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import useStore from '../../hooks/useStore';
import { StatusBar as SB } from 'expo-status-bar';
import DraggableLine from '../Line/DraggableLine';
import ModalInput from '../Inputs/ModalInput';
import ModalButton from '../Buttons/ModalButton';
import { ModalMode } from '../../types/modalMode.types';

interface IProps {
  onPress?: (...args: any) => any;
  mode: ModalMode;
}

export default observer(function BaseModal({ onPress, mode }: IProps) {
  const { commonStore } = useStore();
  const { isModalVisible, toggleModal } = commonStore;

  const [inputValue, setInputValue] = useState('');

  return (
    <Modal
      swipeDirection={'down'}
      onSwipeComplete={() => toggleModal()}
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
              {mode === 'add' ? (
                <View>
                  <ModalInput
                    accessible
                    accessibilityLabel="Ingredient name"
                    accessibilityHint="Text input for adding an ingredient"
                    value={inputValue}
                    onChangeText={setInputValue}
                  />
                  <ModalButton
                    accessible
                    accessibilityHint="Press to add ingredient to common ingredients list"
                    accessibilityLabel="add button"
                    onPress={onPress!}
                    message="Add"
                    value={inputValue}
                  />
                </View>
              ) : null}
            </View>
          </ScrollView>
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
});
