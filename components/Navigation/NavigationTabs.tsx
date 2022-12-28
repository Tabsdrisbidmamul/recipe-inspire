import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/BottomTabs/Home';
import Favourites from '../../screens/BottomTabs/Favourites';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import { Platform } from 'react-native';
import More from '../../screens/BottomTabs/More';

const Tab = createBottomTabNavigator();

/**
 * Bottom tabs, remove safe area inset for ios, we move the bottom tabs up - it looks good on Android and iOS
 * @returns
 */
export default function NavigationTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.blacks.charcoal,
        tabBarInactiveTintColor: colors.whites.doveGrey,
        tabBarStyle: {
          position: 'absolute',

          ...globalStyles.shadows,
          ...globalStyles.baseBorderRadius,
          ...globalStyles.basePaddingHorizontal,
          ...globalStyles.baseMarginHorizontal,

          bottom: 10,
          backgroundColor: colors.whites.pastel,
          ...Platform.select({
            ios: {
              bottom: 20,
            },
          }),
        },
      }}
      initialRouteName="HomeStack"
      safeAreaInsets={{
        bottom: 0,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Ionicons name="md-home-sharp" size={size} color={color} />
            ) : (
              <Ionicons name="md-home-outline" size={size} color={color} />
            ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Ionicons name="heart-sharp" size={size} color={color} />
            ) : (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
        }}
        component={Favourites}
      />
      <Tab.Screen
        name="More"
        options={{
          title: 'More',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Ionicons name="menu-sharp" size={size} color={color} />
            ) : (
              <Ionicons name="menu-outline" size={size} color={color} />
            ),
        }}
        component={More}
      />
    </Tab.Navigator>
  );
}
