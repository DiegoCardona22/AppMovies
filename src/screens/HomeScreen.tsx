// @packages
import Carousel from 'react-native-snap-carousel';
import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// @scripts
import GradientBackground from '../components/GradientBackground';
import MoviePoster from '../components/MoviePoster';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { getImageColors } from '../helpers/getColors';
import { useMovies } from '../hooks/useMovies';
import { GradientContext } from '../context/GradientContext';

// @constants
const { width: windowWidth}  = Dimensions.get('window');

const HomeScreen = () => {
  const {
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    isLoading,
  } = useMovies();
  const { top } = useSafeAreaInsets();
  const { setMainColors } = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie = nowPlayingMovies[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);
    setMainColors({ primary, secondary });
  };

  useEffect(() => {
    if (!!nowPlayingMovies.length) {
      getPosterColors(0);
    }
  }, [nowPlayingMovies]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          <View style={{height: 440}}>
            <Carousel
              data={nowPlayingMovies}
              renderItem={({item}: any) => <MoviePoster movies={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>
          <HorizontalSlider title="Now Playing" movies={nowPlayingMovies} />
          <HorizontalSlider title="Popular Movies" movies={popularMovies} />
          <HorizontalSlider title="Top Rated" movies={topRatedMovies} />
          <HorizontalSlider title="Upcoming Movies" movies={upcomingMovies} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default HomeScreen;
