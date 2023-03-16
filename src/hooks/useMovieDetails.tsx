// @packages
import { useState, useEffect } from 'react';

// @scripts
import movieDB from '../api/movieDB';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/movieDBInterface';

interface MovieDetails {
  cast: Cast[];
  isLoading: boolean;
  movieFull?: MovieFull;
}

export const useMovieDetails = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  } as MovieDetails);

  const getMovieDetails = async () => {
    setIsLoading(true);
    const castDetailsPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);
    const movieDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`);

    const [castDetailsResponse, movieDetailsResponse] = await Promise.all([
      castDetailsPromise,
      movieDetailsPromise,
    ]);


    setMovieDetails({
      isLoading: false,
      cast: castDetailsResponse.data.cast,
      movieFull: movieDetailsResponse.data,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...movieDetails,
    isLoading,
  };
};
