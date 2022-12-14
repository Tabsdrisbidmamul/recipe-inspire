import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Details from '../../screens/Details';
import NavigationTabs from './NavigationTabs';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeTab"
    >
      <Stack.Screen name="HomeTab" component={NavigationTabs} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
