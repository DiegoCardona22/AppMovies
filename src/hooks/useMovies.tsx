// @packages
import { useState, useEffect } from 'react';

// @scripts
import movieDB from '../api/movieDB';
import { MovieDBMoviesResponse, Movies } from '../interfaces/movieDBInterface';

interface MoviesState {
  nowPlayingMovies: Movies[];
  popularMovies: Movies[];
  topRatedMovies: Movies[];
  upcomingMovies: Movies[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<MoviesState>({
    nowPlayingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
  });

  const getMovies = async () => {
    setIsLoading(true);
    const responseNowPlaying = movieDB.get<MovieDBMoviesResponse>('/now_playing');
    const responsePopular = movieDB.get<MovieDBMoviesResponse>('/popular');
    const responseTopRated = movieDB.get<MovieDBMoviesResponse>('/top_rated');
    const responseUpcoming = movieDB.get<MovieDBMoviesResponse>('/upcoming');

    const response = await Promise.all([
      responseNowPlaying,
      responsePopular,
      responseTopRated,
      responseUpcoming,
    ]);

    setMovies({
      nowPlayingMovies: response[0].data.results,
      popularMovies: response[1].data.results,
      topRatedMovies: response[2].data.results,
      upcomingMovies: response[3].data.results,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    ...movies,
    isLoading,
  };
};
