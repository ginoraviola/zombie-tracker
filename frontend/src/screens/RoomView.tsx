import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {IRoom} from './Home';
import Zombie from '../components/Zombie';
import MoveZombieDialog from '../components/MoveZombieDialog';
import {getLocationInfo} from '../api';

export const VIEW_MARGIN = 20;

const RoomView = (props: IRoom) => {
  const [showZombieDialog, setShowZombieDialog] = useState();
  const [loading, setLoading] = useState(true);
  const [zombies, setZombies] = useState([]);

  const {room, locations} = props.route.params;
  const {label} = room;

  const fetchLocationData = async (): Promise<void> => {
    const result = await getLocationInfo(room.key);
    await setZombies(result.data.zombies);
    await setLoading(false);
  };

  const removeZombieFromLocation = async (zombie: string): Promise<void> => {
    const newZombies = zombies.filter(z => z !== zombie);
    await setZombies(newZombies);
  };

  useEffect((): void => {
    fetchLocationData();
  }, []);

  const dialogOptions = locations.filter(l => l.key !== room.key);

  const toggleDialog = async (zombieKey: string): Promise<void> => {
    await setShowZombieDialog(zombieKey);
  };

  return loading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="black" />
    </View>
  ) : (
    <>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={[styles.text, styles.title]}>{label}</Text>
          <Text style={[styles.subtitle]}>Zombies: {zombies.length}</Text>
        </View>
        {zombies.map((z, index) => (
          <View key={z} style={{position: 'absolute'}}>
            <Zombie index={index} zombie={z} onZombieClicked={toggleDialog} />
            {showZombieDialog && showZombieDialog === z && (
              <MoveZombieDialog
                availableOptions={dialogOptions}
                zombie={z}
                room={room}
                onRemoveZombieCb={removeZombieFromLocation}
                onCloseDialog={toggleDialog}
              />
            )}
          </View>
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
    backgroundColor: 'steelblue',
    alignItems: 'center',
    borderWidth: 4,
    padding: 5,
    margin: 15,
    borderRadius: 4,
    flex: 1,
  },
  titleView: {
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    color: 'black',
    fontSize: 35,
  },
});

export default RoomView;
