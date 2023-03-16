// @packages
import React, { createContext, useState } from 'react';

interface IGradientContext {
  colors: IImageColors
  prevColors: IImageColors
  setMainColors: (colors: IImageColors) => void;
  setPrevMainColors: (colors: IImageColors) => void;
}

interface IImageColors {
  primary: string;
  secondary: string;
}

export const GradientContext = createContext({} as IGradientContext);

export const GradientProvider = ({ children }: any) => {
  const [colors, setColors] = useState<IImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const [prevColors, setPrevColors] = useState<IImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const setMainColors = (colors: IImageColors) => {
    setColors(colors);
  };

  const setPrevMainColors = (colors: IImageColors) => {
    setPrevColors(colors);
  };

  return (
    <GradientContext.Provider
      value={{
        colors,
        prevColors,
        setMainColors,
        setPrevMainColors,
      }}
    >
      {children}
    </GradientContext.Provider>
  );
};
