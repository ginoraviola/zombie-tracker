import React, {useCallback, useEffect} from 'react';
import {Dimensions, Text, Image, TouchableOpacity} from 'react-native';
import Animated, {EasingNode} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  diffClamp,
  usePanGestureHandler,
  withDecay,
  useValue,
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

const Zombie = ({onZombieClicked, zombie}: IZombieProps) => {
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();

  const upperBound: number = 0;
  const lowerBound: number = height - VIEW_MARGIN - ZOMBIE_SIZE - MARGIN;
  const leftBound: number = -width / 2 + ZOMBIE_SIZE / 2;
  const rightBound: number = width / 2 - ZOMBIE_SIZE / 2;

  // Set the initial values for X and Y - Randomly generated
  let x: Animated.Value<number> = useValue(
    Math.floor(Math.random() * (rightBound - leftBound) + leftBound),
  );

  let y: Animated.Value<number> = useValue(
    Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound),
  );

  const onClicked = (): void => {
    onZombieClicked(zombie);
  };

  const translateX = diffClamp(
    withDecay({
      value: translation.x,
      velocity: velocity.x,
      state,
    }),
    leftBound,
    rightBound,
  );

  const translateY = diffClamp(
    withDecay({
      value: translation.y,
      velocity: velocity.y,
      state,
    }),
    upperBound,
    lowerBound,
  );
  const animateZombie = useCallback(() => {
    Animated.timing(translation.x, {
      toValue: x,
      duration: 2000,
      easing: EasingNode.linear,
    }).start();

    Animated.timing(translation.y, {
      toValue: y,
      duration: 2000,
      easing: EasingNode.linear,
    }).start();
  }, [translateY, translateX]);

  useEffect((): void => {
    animateZombie();
  }, []);

  return (
    <>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            transform: [{translateX}, {translateY}],
          }}>
          <Text>{translation.x.value}</Text>
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
