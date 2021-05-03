import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import RoomItem from '../components/RoomItem';
import {getLocations} from '../api';

export interface IRoom {
  key: number;
  label: string;
  zombies: number[];
}

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (): Promise<void> => {
    const result = await getLocations();
    await setLocations(result.data);
    await setLoading(false);
  };

  useEffect((): void => {
    fetchData();
  }, [locations]);

  return loading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="steelblue" />
    </View>
  ) : (
    <>
      <View style={styles.container}>
        {locations.map((room: IRoom) => (
          <RoomItem
            label={room.label}
            locations={locations}
            room={room}
            key={room.key}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    backgroundColor: 'aliceblue',
  },
});

export default Home;
