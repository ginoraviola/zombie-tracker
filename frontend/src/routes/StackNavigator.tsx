import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from "../screens/Home";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
            name="Home"
            component={Home}
        />
      </Stack.Navigator>
  );
};

export default StackNavigator;
