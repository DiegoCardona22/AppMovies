// @packages
import React from 'react';
import { FlatList, Text, View } from 'react-native';

// @scripts
import MoviePoster from './MoviePoster';
import { Movies } from '../interfaces/movieDBInterface';

interface HorizontalSliderProps {
  title: string;
  movies: Movies[];
}

export const HorizontalSlider = ({
  title = '',
  movies,
}: HorizontalSliderProps) => {
  return (
    <View style={title ? { height: 260 } : { height: 220 }}>
      {!!title && (
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10 }}>
          {title}
        </Text>
      )}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: any) => (
          <MoviePoster movies={item} height={200} width={140} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
