import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Splash from '../screens/Splash';
import BottomTabNavigator from './BottomTabNavigator';
import CandidateDetails from '../screens/CandidateDetails';
import NewCandidate from '../screens/NewCandidate';
import Candidates from '../screens/Candidates';

export default function RootNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CandidateDetails"
        component={CandidateDetails}
        options={{ title: 'Candidate Details' }}
      />
      <Stack.Screen name="Candidates" component={Candidates} />
      <Stack.Screen
        name="AddCandidate"
        component={NewCandidate}
        options={{ title: 'Add candidate to poll' }}
      />
    </Stack.Navigator>
  );
}
