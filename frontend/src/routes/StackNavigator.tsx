import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from "../screens/Home";
import RoomView from "../screens/RoomView";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
            name="Home"
            component={Home}
        />
        <Stack.Screen
            name="Room"
            component={RoomView}
        />
      </Stack.Navigator>
  );
};

export default StackNavigator;
