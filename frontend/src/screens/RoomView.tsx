import React, { useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {IRoom} from "./Home";
import Zombie from "../components/Zombie";
import MoveZombieDialog from "../components/MoveZombieDialog";

const {height} = Dimensions.get('window');

const RoomView = (props: IRoom) => {
  const [showZombieDialog, setShowZombieDialog] = useState(null);
  const {room, locations} = props.route.params;
  const {label, zombies} = room;

  const dialogOptions = locations.filter(l => l.key !== room.key);

  const toggleDialog = async (zombieKey) => {
    await setShowZombieDialog(zombieKey);
  }

  return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={[styles.text, styles.title]}>{label}</Text>
          <Text style={[styles.subtitle]}>Zombies: {zombies.length}</Text>
        </View>
        {zombies.map((z,index) => (
            <View key={z}>
            <Zombie index={index}
                    zombie={z}
                    onZombieClicked={toggleDialog}
            />
              {showZombieDialog && showZombieDialog === z && (
                  <MoveZombieDialog availableOptions={dialogOptions}
                                    onCloseDialog={toggleDialog}
                  />
              )
              }
            </View>
        ))}
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
  titleView: {
    flexDirection: 'column'
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    color: 'black',
    fontSize: 35,
  }
});

export default RoomView;
