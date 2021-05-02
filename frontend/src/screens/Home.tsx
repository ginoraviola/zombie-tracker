import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import RoomItem from "../components/RoomItem";

export interface IRoom {
  key: number;
  label: string;
  zombies: number[];
}

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return loading ? (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="steelblue" />
      </View>
  ) : (
      <>
        <View style={styles.container}>
          {locations.map(room => (
              <RoomItem label={room.label}
                        room={room}
                        key={room.key}/>
          ))}
        </View>
      </>
  )
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  container: {
    justifyContent: "center",
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
});

export default Home;
