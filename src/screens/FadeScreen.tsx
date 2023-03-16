// @packages
import React from 'react';
import { Animated, Button, View } from 'react-native';

// @scripts
import useFade from '../hooks/useFade';

const FadeScreen = () => {
  const {
    fadeIn,
    fadeOut,
    opacityRef,
  } = useFade();

  return (
    <View style={{ flex: 1, backgroundColor: 'grey' }}>
      <Animated.View
        style={{
          backgroundColor: 'blue',
          width: 150,
          height: 150,
          borderWidth: 10,
          borderColor: 'white',
          opacity: opacityRef,
        }}
      />
      <Button title="Fade In" onPress={fadeIn} />
      <Button title="Fade Out" onPress={fadeOut} />
    </View>
  );
};

export default FadeScreen;
