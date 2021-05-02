import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, Image} from 'react-native';
import {IRoom} from "./Home";
import Zombie from "../components/Zombie";
import MoveZombieDialog from "../components/MoveZombieDialog";

const {width, height} = Dimensions.get('window');

const RoomView = (props: IRoom) => {
  const {label, zombies} = props.route.params.room;

  return (
      <View style={styles.container}>
        <Text style={styles.text}>Zombies: {zombies.length}</Text>
        <Text style={styles.text}>{label}</Text>
        {zombies.map((z,index) => (
            <Zombie key={z} index={index} />
        ))}
        <MoveZombieDialog />
      </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'steelblue',
    flexDirection: 'row',
    borderWidth: 4,
    padding: 5,
    margin: 15,
    height: height - 100,
  },
  text: {
    color: 'black',
    fontSize: 35,
  }
});

export default RoomView;
