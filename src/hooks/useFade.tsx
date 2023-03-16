// @packages
import { Animated } from 'react-native';
import { useRef } from 'react';

const useFade = () => {
  const opacityRef = useRef<Animated.Value>(new Animated.Value(0)).current;

  const fadeIn = (callBack?: () => void) => {
    Animated.timing(opacityRef, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (callBack) {
        callBack();
      }
    });
  };

  const fadeOut = (duration = 300) => {
    Animated.timing(opacityRef, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return {
    fadeIn,
    fadeOut,
    opacityRef,
  };
};

export default useFade;
