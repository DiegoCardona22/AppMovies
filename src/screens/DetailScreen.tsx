// @packages
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { View, Image, StyleSheet, Dimensions, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';

// @scripts
import MovieDetails from '../components/MovieDetails';
import { RootStackParams } from '../routes/StackNavigator';
import { useMovieDetails } from '../hooks/useMovieDetails';

// @constants
const screenHeight = Dimensions.get('screen').height;

interface DetailScreenProps extends StackScreenProps <RootStackParams, 'DetailScreen'> {}

const DetailScreen = ({
  route,
}: DetailScreenProps) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const { isLoading, movieFull, cast } = useMovieDetails(movie.id);

  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image
            source={{ uri }}
            style={styles.posterImage}
          />
        </View>
        <View style={styles.marginContainer}>
          <Text style={styles.subTitle}>{movie.original_title}</Text>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size={30} color="grey" style={{ marginTop: 20 }} />
        ) : (
          <MovieDetails movieFull={movieFull!} cast={cast} />
        )}
      </View>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            size={60}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  imageContainer: {
    width: '100%',
    backgroundColor: 'white',
    height: screenHeight * 1.2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 3.84,
    elevation: 20,
  },
  posterImage: {
    flex: 1,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5,
  },
});

export default DetailScreen;
