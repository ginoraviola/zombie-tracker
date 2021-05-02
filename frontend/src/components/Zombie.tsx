import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  diffClamp,
  usePanGestureHandler,
  withDecay,
} from 'react-native-redash/lib/module/v1';

import {VIEW_MARGIN} from '../screens/RoomView';

const {width, height} = Dimensions.get('window');
const ZOMBIE_SIZE = 60;
const MARGIN = 100;

interface IZombieProps {
  index: number;
  onZombieClicked: Function;
  zombie: number;
}

const Zombie = ({index, onZombieClicked, zombie}: IZombieProps) => {
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();

  const upperBound = -height / 2 + ZOMBIE_SIZE / 2 + MARGIN / 2;
  const lowerBound = height / 2 - ZOMBIE_SIZE / 2 - MARGIN / 2;
  const leftBound = 0 - index * ZOMBIE_SIZE;
  const rightBound = width - VIEW_MARGIN - ZOMBIE_SIZE;

  const onClicked = () => {
    onZombieClicked(zombie);
  };

  const y = diffClamp(
    withDecay({
      value: translation.y,
      velocity: velocity.y,
      state,
    }),
    upperBound,
    lowerBound,
  );

  const x = diffClamp(
    withDecay({
      value: translation.x,
      velocity: velocity.x,
      state,
    }),
    leftBound,
    rightBound,
  );

  return (
    <>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            alignItems: 'center',
            transform: [{translateY: y}, {translateX: x}],
          }}>
          <TouchableOpacity onPress={() => onClicked()}>
            <Image
              source={require('../assets/zombie.png')}
              style={{height: ZOMBIE_SIZE, width: ZOMBIE_SIZE}}
            />
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Zombie;
