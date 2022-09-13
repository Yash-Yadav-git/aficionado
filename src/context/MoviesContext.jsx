import { useState, useReducer } from "react";

import { createContext } from "react";
import NotFound from "../pages/NotFound";
import MoviesReducer from "./MoviesReducer";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const initailState = {
    movies: [],
    movie: {},
    similarMovies: [],
    genere: [],
    isloading: false,
  };
  const API_KEY = "b27b18620de5a2b789d6d0b01d2c2e8a";
  const API_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=1`;
  // const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;
  const SEARCH_URL = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query="`;
  const GenreURL =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=b27b18620de5a2b789d6d0b01d2c2e8a&language=en-US";
  const TRENDING_MOVIE_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=1`;
  const TRENDING_SHOWS_URL = `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&language=en-US&page=1`;
  const [state, dispatch] = useReducer(MoviesReducer, initailState);
  const [isLoading, setIsLoading] = useState(true);
  const [movieGenre, setMovieGenre] = useState([]);
  const [mediatype, setMediaType] = useState("");
  const [id, setId] = useState("");
  const [videoKey, setVideoKey] = useState("");

  //Get Popular movies
  const fetchMovies = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();

    dispatch({
      type: "GET_MOVIES",
      payload: data.results,
    });
  };

  //Get Trending movies
  const getTrendingMovies = async () => {
    const response = await fetch(TRENDING_MOVIE_URL);
    const data = await response.json();
    dispatch({
      type: "GET_TRENDING_MOVIES",
      payload: data.results,
    });
  };

  //Get popular TV SHows
  const getTrendingShows = async () => {
    const response = await fetch(TRENDING_SHOWS_URL);
    const data = await response.json();
    dispatch({
      type: "GET_TRENDING_SHOWS",
      payload: data.results,
    });
  };

  //Search Movies
  const searchMovies = async (text) => {
    const response = await fetch(SEARCH_URL + text + `"`);
    const data = await response.json();

    dispatch({
      type: "SEARCH_RESULTS",
      payload: data.results,
    });
    setIsLoading(false);
  };

  //Set Single user
  // const setMovie = (movieData) => {
  //   dispatch({
  //     type: "SET_MOVIE",
  //     payload: movieData,
  //   });
  // };

  //Get Data
  const getData = (id, mediatype) => {
    const url = `https://api.themoviedb.org/3/${mediatype}/${id}?api_key=${API_KEY}&language=en-US`;
    setId(id);
    setMediaType(mediatype);
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: "SET_MOVIE",
        payload: data,
      });
    };
    fetchData();
  };

  const getVideo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${mediatype}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    data.results.map(({ name, key }) => {
      if (name === "Official Trailer") {
        setVideoKey(key);
      }
    });
  };

  const getSimilarMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${mediatype}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    dispatch({
      type: "SIMILAR_MOVIES",
      payload: data.results,
    });
  };

  //Get Genre
  const getGenere = async () => {
    const response = await fetch(GenreURL);
    const data = await response.json();
    dispatch({
      type: "GET_GENRE",
      payload: data.genres,
    });
  };

  //Set Movie Genere
  // const mapGenre = (genere_ids) => {
  //   setMovieGenre([""]);
  //   state.genere.map((listId) => {
  //     genere_ids.map((id) => {
  //       if (listId.id === id) {
  //         setMovieGenre((prev) => [...prev, listId.name]);
  //       }
  //     });
  //   });
  //   console.log(movieGenre);
  //   localStorage.setItem("movie-genre", JSON.stringify(movieGenre));
  // };

  //Get Similar movies

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        fetchMovies,
        searchMovies,
        isLoading,
        movie: state.movie,
        // setMovie,
        getGenere,
        genere: state.genere,
        // mapGenre,
        movieGenre,
        getTrendingMovies,
        getTrendingShows,
        getData,
        getVideo,
        videoKey,
        getSimilarMovies,
        similarMovies: state.similarMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;
