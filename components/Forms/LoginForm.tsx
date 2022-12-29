import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import colors from '../../constants/colors';
import globalConstants from '../../constants/globalConstants';
import { globalStyles } from '../../constants/globalStyles';
import { signInUser } from '../../firebase';
import useStore from '../../hooks/useStore';
import AuthButton from '../Buttons/AuthButton';
import ModalButton from '../Buttons/ModalButton';
import RootView from '../Root/RootView';

export default observer(function LoginForm() {
  const navigation = useNavigation();
  const { userStore } = useStore();

  const { setUser } = userStore;

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  function navigateBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  async function login() {
    const user = await signInUser(emailValue.toLowerCase(), passwordValue);

    if (user === undefined) {
      Toast.show({
        type: 'error',
        text1: 'Email or password is incorrect',
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Logged in successfully',
    });

    await setUser(user);
    navigateBack();
  }

  return (
    <RootView title="Login" showHeader onPress={navigateBack} mode="default">
      <View>
        <Text style={styles.header}>Log into your account</Text>
        <TextInput
          accessible
          accessibilityLabel="Email input"
          accessibilityHint="Enter your email"
          style={styles.input}
          value={emailValue}
          onChangeText={setEmailValue}
          placeholder={'Email'}
          placeholderTextColor={colors.blacks.charcoal}
        />
        <TextInput
          accessible
          accessibilityLabel="Password input"
          accessibilityHint="Enter your password"
          style={styles.input}
          value={passwordValue}
          onChangeText={setPasswordValue}
          placeholder={'Password'}
          placeholderTextColor={colors.blacks.charcoal}
          secureTextEntry={true}
        />

        <Pressable
          accessible
          accessibilityLabel="Login button"
          accessibilityHint="Tap to login"
          onPress={login}
          style={styles.button}
        >
          <Text style={[styles.text, { color: colors.whites.pastel }]}>Login</Text>
        </Pressable>
      </View>
    </RootView>
  );
});

const styles = StyleSheet.create({
  text: {
    ...globalStyles.baseText,
    color: colors.blacks.charcoal,
    textAlign: 'center',
  },
  header: {
    ...globalStyles.headerH2,
    marginBottom: 12,
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.whites.pastel,
    borderRadius: globalConstants.cardBorderRadius,
    marginBottom: 12,
    ...globalStyles.baseText,
    color: colors.blacks.charcoal,
  },
  button: {
    marginTop: 20,
    padding: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.primary.green,
    borderRadius: globalConstants.cardBorderRadius,
  },
});
