import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {Extrapolate, interpolateNode} from 'react-native-reanimated'
import {PanGestureHandler} from "react-native-gesture-handler";
import {diffClamp, usePanGestureHandler, withDecay} from "react-native-redash/lib/module/v1";
import MoveZombieDialog from "./MoveZombieDialog";

const {width, height} = Dimensions.get('window');
const ZOMBIE_SIZE = 60;
const MARGIN = 200;
const HEIGHT = ZOMBIE_SIZE + MARGIN * 2;

const UPPER_BOUND = +HEIGHT + ZOMBIE_SIZE;
const BOTTOM_BOUND = height - MARGIN - ZOMBIE_SIZE/2 -400;


const Zombie = (props) => {
  console.log({props});

  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();
  const upper = -HEIGHT/2 * props.index + ZOMBIE_SIZE/2 + MARGIN/2;
  console.log(upper, props.index);
  if (props.index === 5) {
    console.log('------')
  }

  const onZombieClicked = () => {
    props.onZombieClicked(props.zombie);
  }

  const y =
      diffClamp(withDecay({
        value: translation.y,
        velocity: velocity.y,
        state,
      }), upper , HEIGHT);

  const x =
      diffClamp(withDecay({
        value: translation.x,
        velocity: velocity.x,
        state,
      }), - width /2 + ZOMBIE_SIZE/2, width /2 - ZOMBIE_SIZE /2);

  return (
      <>
        <PanGestureHandler {...gestureHandler}>
          <Animated.View
              style={{
                alignItems: 'center',
                transform: [{translateY: y}, {translateX: x}]
              }}>
            <TouchableOpacity
                onPress={onZombieClicked}
            >
              <Image source={require('../assets/zombie.png')}
                     style={{height: ZOMBIE_SIZE, width: ZOMBIE_SIZE, margin: 10}}/>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      </>
  );
};

const styles = StyleSheet.create({
});

export default Zombie;
