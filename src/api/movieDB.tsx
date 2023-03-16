// @packages
import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'aa4396332b3c56fd78b0e43ccdd00173',
    language: 'es-ES',
  },
});

export default movieDB;
