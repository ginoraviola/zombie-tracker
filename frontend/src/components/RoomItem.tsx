import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IRoom} from '../screens/Home';

interface IRoomProps {
  label: string;
  room: IRoom;
  locations: IRoom[];
}

const RoomItem = (props: IRoomProps) => {
  const navigation = useNavigation();

  const onEnterRoom = (): void => {
    navigation.navigate('Room', {room: props.room, locations: props.locations});
  };

  return (
    <TouchableOpacity
      onPress={onEnterRoom}
      style={[styles.room, {backgroundColor: 'lightblue'}]}>
      <Text style={styles.label}>{props.label}</Text>

      <View style={styles.counter}>
        <Image
          source={require('../assets/zombie.png')}
          style={{height: 40, width: 40}}
        />
        <Text style={styles.zombieCount}>
          Count: {props.room.zombies.length}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  room: {
    elevation: 5,
    borderWidth: 1,
    borderRadius: 10,
    height: 400,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'yellow',
    margin: 10,
    flexDirection: 'column',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    flex: 4,
  },
  counter: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  zombieCount: {
    fontWeight: 'bold',
  },
});

export default RoomItem;
