// @packages
import React from 'react';
import { Cast } from '../interfaces/creditsInterface';
import { Image, StyleSheet, Text, View } from 'react-native';

interface CastItemProps {
  actor: Cast;
}

const CastItem = ({ actor }: CastItemProps) => {
  const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;

  return (
    <View style={styles.container}>
      {!!actor.profile_path && (
        <Image
          source={{ uri }}
          style={styles.actorImage}
        />
      )}
      <View style={styles.actorInfo}>
        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{actor.name}</Text>
        <Text style={{ fontSize: 10, opacity: 0.7 }}>{actor.character}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actorImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 5,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 50,
    marginRight: 10,
    paddingRight: 10,
  },
});

export default CastItem;
