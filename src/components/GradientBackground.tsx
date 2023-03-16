// @packages
import LinearGradient from 'react-native-linear-gradient';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

// @scripts
import useFade from '../hooks/useFade';
import { GradientContext } from '../context/GradientContext';

interface IGradientBackgroundProps {
  children: JSX.Element | JSX.Element[];
}

const GradientBackground = ({
  children,
}: IGradientBackgroundProps) => {
  const { colors, prevColors, setPrevMainColors } = useContext(GradientContext);
  const { fadeIn, fadeOut, opacityRef } = useFade();

  useEffect(() => {
    fadeIn(
      () => {
        setPrevMainColors(colors);
        fadeOut(0);
      }
    );
  }, [colors]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <LinearGradient
        colors={[prevColors.primary, prevColors.secondary, 'white']}
        style={{ ...StyleSheet.absoluteFillObject }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.5, y: 0.7 }}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: opacityRef,
        }}
      >
        <LinearGradient
          colors={[colors.primary, colors.secondary, 'white']}
          style={{ ...StyleSheet.absoluteFillObject }}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.5, y: 0.7 }}
        />
      </Animated.View>
      {children}
    </View>
  );
};

export default GradientBackground;
