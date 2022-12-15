import { observer } from 'mobx-react-lite';
import React from 'react';
import { View, Text } from 'react-native';
import LoginButton from '../Buttons/LoginButton';

export default observer(function LoginForm() {
  return (
    <View>
      <Text>Login form works</Text>
    </View>
  );
});
