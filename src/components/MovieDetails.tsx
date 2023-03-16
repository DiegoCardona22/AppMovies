// @packages
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import currencyFormatter from 'currency-formatter';
import { View, Text, FlatList } from 'react-native';

// @scripts
import CastItem from './CastItem';
import { Cast } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/movieDBInterface';

interface MovieDetailsProps {
  movieFull: MovieFull;
  cast: Cast[];
}

const MovieDetails = ({
  movieFull,
  cast,
}: MovieDetailsProps) => {
  return (
    <>
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="star-outline" color="grey" size={16} />
          <Text>{movieFull.vote_average}</Text>
          <Text style={{ marginLeft: 5 }}>
            - {movieFull.genres.map((g) => g.name).join(', ')}
          </Text>
        </View>
        <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black' }}>
          Historia
        </Text>
        <Text style={{ fontSize: 16 }}>
          {movieFull.overview}
        </Text>
        <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black' }}>
          Presupuesto
        </Text>
        <Text style={{ fontSize: 16 }}>
          {currencyFormatter.format(movieFull.budget, { code: 'USD' })}
        </Text>
        <View style={{ marginTop: 10, marginBottom: 100 }}>
          <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black' }}>
            Actores
          </Text>
          <FlatList
            data={cast}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }: any) => <CastItem actor={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10, height: 70 }}
          />
        </View>
      </View>
    </>
  );
};

export default MovieDetails;
