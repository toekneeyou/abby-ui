import {useRef} from 'react';
import {PanResponder} from 'react-native';

export const usePanResponder = () => {
  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onPanResponderGrant: (evt, gestureState) => {
      //   // The gesture has started. Show visual feedback so the user knows
      //   // what is happening!
      //   // gestureState.d{x,y} will be set to zero now
      // },
      // onPanResponderMove: (evt, gestureState) => {
      // },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      // onPanResponderRelease: (evt, gestureState) => {
      //   // The user has released all touches while this view is the
      //   // responder. This typically means a gesture has succeeded
      // },
      // onPanResponderTerminate: (evt, gestureState) => {
      //   // Another component has become the responder, so this gesture
      //   // should be cancelled
      // },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  return panResponder;
};
