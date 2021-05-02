import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {IRoom} from './Home';
import Zombie from '../components/Zombie';
import MoveZombieDialog from '../components/MoveZombieDialog';
import {getLocationInfo} from '../api';

const {width, height} = Dimensions.get('window');
export const VIEW_MARGIN = 20;

const RoomView = (props: IRoom) => {
  const [showZombieDialog, setShowZombieDialog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zombies, setZombies] = useState([]);

  const {room, locations} = props.route.params;
  const {label} = room;

  const fetchLocationData = async () => {
    const result = await getLocationInfo(room.key);
    await setZombies(result.data.zombies);
    await setLoading(false);
  };

  const removeZombieFromLocation = async (zombie) => {
    const newZombies = zombies.filter(z => z !== zombie);
    await setZombies(newZombies);
  };

  useEffect(() => {
    fetchLocationData();
  }, []);

  const dialogOptions = locations.filter(l => l.key !== room.key);

  const toggleDialog = async (zombieKey) => {
    await setShowZombieDialog(zombieKey);
  };

  return loading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="black" />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={[styles.text, styles.title]}>{label}</Text>
        <Text style={[styles.subtitle]}>Zombies: {zombies.length}</Text>
      </View>
      <View style={{borderColor: 'blue', flex: 1}}>
        {zombies.map((z, index) => (
          <View key={z}>
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
      <Text style={{color: 'black', bottom: 0}}>
        Click on a zombie to see actions
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container: {
    position: 'relative',
    width: width - VIEW_MARGIN,
    backgroundColor: 'steelblue',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    padding: 5,
    margin: 15,
    height: height - VIEW_MARGIN - 100,
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
