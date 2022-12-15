import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Search from '../../screens/Search';
import Settings from '../../screens/Settings';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

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

          borderRadius: 100,
          paddingHorizontal: 10,
          marginHorizontal: 10,
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
        name="Search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Ionicons name="search" size={size} color={color} />
            ) : (
              <Ionicons name="search" size={size} color={color} />
            ),
        }}
        component={Search}
      />
      <Tab.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Ionicons name="menu-sharp" size={size} color={color} />
            ) : (
              <Ionicons name="menu-outline" size={size} color={color} />
            ),
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
}
