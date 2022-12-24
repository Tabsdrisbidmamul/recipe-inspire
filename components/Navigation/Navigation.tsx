import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CameraScreen from '../../screens/StackScreen/CameraScreen';
import Details from '../../screens/StackScreen/Details';
import Ingredients from '../../screens/StackScreen/Ingredients';
import SearchResults from '../../screens/StackScreen/SearchResults';
import Settings from '../../screens/StackScreen/Settings';
import NavigationTabs from './NavigationTabs';

const Stack = createStackNavigator();

/**
 * Main navigation, we do this so we can remove the bottom tab from certain pages
 * @returns
 */
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName="HomeTab"
      >
        <Stack.Screen name="HomeTab" component={NavigationTabs} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Ingredients" component={Ingredients} />
        <Stack.Screen name="SearchResults" component={SearchResults} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
