import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RoomItem from "../components/RoomItem";

export interface IRoom {
  key: number;
  label: string;
  zombies: number[];
}

const Home = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // TODO: Do Request to backend.
    setLocations([
      {
        key: 'school-key',
        label: 'School',
        zombies: ['zs1','zs2','zs3','zs4','zs5','zs6']
      },
      {
        key: 'warehouse-key',
        label: 'Warehouse',
        zombies: ['zw1','zw2','zw3','zw4']
      },
      {
        key: 'hospital-key',
        label: 'Hospital',
        zombies: ['zs1','zs2','zs3','zs4']
      },
    ])
  }, []);

  return (
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
