import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import Home from "../screens/Home";
import RoomView from "../screens/RoomView";
import axios from "axios";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const {data} = await axios.get(`http://192.168.1.22:5000/locations`);
      console.log(data);
      await setLocations([...data]);
      await setLoading(false);
    } catch (e) {
      console.warn('Error fetching locations');
    }
  }

  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
            name="Home"
            component={Home}
        />
        <Stack.Screen
            name="Room"
            initialParams={{locations: locations}}
            component={RoomView}
        />
      </Stack.Navigator>
  );
};

export default StackNavigator;
