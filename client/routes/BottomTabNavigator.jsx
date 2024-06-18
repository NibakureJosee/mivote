import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Candidates from '../screens/Candidates';
import { AntDesign } from '@expo/vector-icons';
import Polls from '../screens/Polls';
import Settings from '../screens/Settings';

export default function BottomTabNavigator() {
  const BottomTab = createBottomTabNavigator();

  const isRouteActive = (activeRoute, state) => {
    const indexOfActiveRoute = state.routeNames.indexOf(activeRoute);
    return indexOfActiveRoute !== -1 && state.index === indexOfActiveRoute;
  };

  return (
    <BottomTab.Navigator
      initialRouteName="Polls"
      screenOptions={{ tabBarActiveTintColor: '#0B4890' }}
    >
      <BottomTab.Screen
        name="Polls"
        component={Polls}
        options={({ navigation, route }) => ({
          tabBarIcon: () => {
            const a = isRouteActive(route.name, navigation.getState());
            return (
              <AntDesign
                name="dashboard"
                size={24}
                color={a ? '#0B4890' : 'black'}
              />
            );
          },
        })}
      />
      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={({ navigation, route }) => ({
          title: '',
          tabBarIcon: () => {
            const a = isRouteActive(route.name, navigation.getState());
            return (
              <AntDesign
                name="setting"
                size={24}
                color={a ? '#0B4890' : 'black'}
              />
            );
          },
        })}
      />
    </BottomTab.Navigator>
  );
}
