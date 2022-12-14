import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Search from '../../screens/Search';
import Settings from '../../screens/Settings';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';

const Tab = createBottomTabNavigator();

export default function NavigationTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.darkBlue,
        tabBarInactiveTintColor: colors.whites.doveGrey,
        tabBarStyle: {
          // backgroundColor: 'transparent',
          borderTopColor: colors.primary.darkBlue,
          borderTopWidth: 0.5,
          // position: 'absolute',
          // left: 50,
          // right: 50,
          // bottom: 0,
          // height: 100,
          // width: '100%',
          // elevation: 0,
          // paddingTop: 0,
          backgroundColor: colors.gradient.yellow,
        },
        // tabBarLabelStyle: {
        //   position: 'absolute',
        //   bottom: 10,
        //   color: colors.primary.darkBlue,
        // },
      }}
      initialRouteName="HomeStack"
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
              <Ionicons name="settings-sharp" size={size} color={color} />
            ) : (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
}
