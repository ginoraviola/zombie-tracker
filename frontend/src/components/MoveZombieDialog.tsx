import React, {useEffect, useState} from 'react';
import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {relocateZombie, removeZombie} from '../api';

const MoveZombieDialog = ({availableOptions, zombie, room, onRemoveZombieCb, onCloseDialog}) => {
  const onClose = () => {
    onCloseDialog(null);
  };

  const onRemoveZombie = async () => {
    try {
      onRemoveZombieCb(zombie);
      const {data} = await removeZombie({zombie, room: room.key});
      console.log({data});
    } catch ({response}) {
      console.warn(response.data.message);
    }
    onClose();
  };

  const onRelocateZombie = async location => {
    console.log('called');
    onRemoveZombieCb(zombie);
    try {
      const {data} = await relocateZombie({
        zombie,
        room: room.key,
        newLocation: location.key,
      });
      console.log({data});
    } catch ({response}) {
      console.warn(response.data.message);
    }
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        onClose();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Move zombie to other location:</Text>

          <View style={styles.buttonsContainer}>
            <View style={{flexDirection: 'row'}}>
              {availableOptions.map((option, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.button,
                    {width: 150, backgroundColor: 'green'},
                  ]}
                  onPress={() => onRelocateZombie(option)}>
                  <Text style={styles.textStyle}>{option.label}</Text>
                </Pressable>
              ))}
            </View>

            <Pressable
              style={[styles.button, {backgroundColor: 'darkred'}]}
              onPress={() => onRemoveZombie()}>
              <Text style={styles.textStyle}>Kill Zombie</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => onClose()}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
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
