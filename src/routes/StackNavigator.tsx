// @packages
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// @scripts
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import { Movies } from '../interfaces/movieDBInterface';

export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Movies;
};

const Stack = createStackNavigator<RootStackParams>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
