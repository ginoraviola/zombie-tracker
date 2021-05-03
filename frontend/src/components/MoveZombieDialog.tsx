import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {relocateZombie, removeZombie} from '../api';
import {IRoom} from '../screens/Home';
import Toast from 'react-native-simple-toast';

interface IMoveZombieDialogInterface {
  availableOptions: IRoom[];
  zombie: string;
  room: IRoom;
  onRemoveZombieCb: Function;
  onCloseDialog: Function;
}

const MoveZombieDialog = ({
  availableOptions,
  zombie,
  room,
  onRemoveZombieCb,
  onCloseDialog,
}: IMoveZombieDialogInterface) => {

  const onClose = (): void => {
    onCloseDialog(null);
  };

  const onRemoveZombie = async (): Promise<void> => {
    try {
      onRemoveZombieCb(zombie);
      await removeZombie({zombie, room: room.key});
      Toast.show('Zombie killed', Toast.LONG);
    } catch ({response}) {
      Toast.show('Missed shot! could not kill zombie.', Toast.LONG);
    }
    onClose();
  };

  const onRelocateZombie = async (location: IRoom): Promise<void> => {
    onRemoveZombieCb(zombie);
    try {
      await relocateZombie({
        zombie,
        room: room.key,
        newLocation: location.key,
      });
      Toast.show('Zombie Relocated successfully.', Toast.LONG);
    } catch ({response}) {
      Toast.show('Ups. error relocating zombie', Toast.LONG);
    }
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Move zombie to other location:</Text>

          <View style={styles.buttonsContainer}>
            <View style={{flexDirection: 'row'}}>
              {availableOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    {width: 150, backgroundColor: 'green'},
                  ]}
                  onPress={() => onRelocateZombie(option)}>
                  <Text style={styles.textStyle}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'darkred'}]}
              onPress={() => onRemoveZombie()}>
              <Text style={styles.textStyle}>Kill Zombie</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => onClose()}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 12,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonsContainer: {
    flexDirection: 'column',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 21,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MoveZombieDialog;
