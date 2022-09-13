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
    setMediaType: "all",
    id: "",
  };
  const API_KEY = "b27b18620de5a2b789d6d0b01d2c2e8a";
  const API_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=1`;
  const SEARCH_URL = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query="`;
  const GenreURL =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=b27b18620de5a2b789d6d0b01d2c2e8a&language=en-US";
  const TRENDING_MOVIE_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=1`;
  const TRENDING_SHOWS_URL = `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&language=en-US&page=1`;
  const [state, dispatch] = useReducer(MoviesReducer, initailState);
  const [movieGenre, setMovieGenre] = useState([]);
  const [mediatype, setMediaType] = useState("");
  const [id, setId] = useState("");
  const [videoKey, setVideoKey] = useState("");

  const fetchAllData = async (url) => {
    const response = await fetch(url);
    return await response.json();
  };

  //Get Popular movies
  const fetchMovies = async (buttonCategoryClicked) => {
    const data = await fetchAllData(API_URL);

    if (buttonCategoryClicked === "poular-movies") {
      const data = await fetchAllData(TRENDING_MOVIE_URL);
      console.log(data.results);
      dispatch({
        type: "GET_TRENDING_MOVIES",
        payload: data.results,
      });
    } else if (buttonCategoryClicked === "popular-tv-shows") {
      const data = await fetchAllData(TRENDING_SHOWS_URL);
      console.log(data.results);
      dispatch({
        type: "GET_TRENDING_SHOWS",
        payload: data.results,
      });
    } else {
      const data = await fetchAllData(API_URL);
      dispatch({
        type: "GET_MOVIES",
        payload: data.results,
      });
    }
  };

  //Search Movies
  const searchMovies = async (text) => {
    const data = await fetchAllData(SEARCH_URL + text + `"`);
    dispatch({
      type: "SEARCH_RESULTS",
      payload: data.results,
    });
  };

  //Get Data
  const getData = async (id, mediatype) => {
    const url = `https://api.themoviedb.org/3/${mediatype}/${id}?api_key=${API_KEY}&language=en-US`;
    setId(id);
    setMediaType(mediatype);
    const data = await fetchAllData(url);

    dispatch({
      type: "SET_MOVIE",
      payload: data,
    });
    const videoData = await fetchAllData(
      `https://api.themoviedb.org/3/${mediatype}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    videoData.results.map(({ name, key }) => {
      if (name === "Official Trailer") {
        setVideoKey(key);
      }
    });

    const similarMoviesData = await fetchAllData(
      `https://api.themoviedb.org/3/${mediatype}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    dispatch({
      type: "SIMILAR_MOVIES",
      payload: similarMoviesData.results,
    });
  };

  const getSimilarData = async (id, mediatype) => {
    const url = `https://api.themoviedb.org/3/${mediatype}/${id}?api_key=${API_KEY}&language=en-US`;
    setId(id);
    setMediaType(mediatype);
    const data = await fetchAllData(url);
    console.log(data);
    dispatch({
      type: "SET_MOVIE",
      payload: data,
    });
    const videoData = await fetchAllData(
      `https://api.themoviedb.org/3/${mediatype}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    setVideoKey("");

    const similarMoviesData = await fetchAllData(
      `https://api.themoviedb.org/3/${mediatype}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    dispatch({
      type: "SIMILAR_MOVIES",
      payload: similarMoviesData.results,
    });
  };

  // const getVideo = async () => {
  //   const response = await fetch(
  //     `https://api.themoviedb.org/3/${mediatype}/${id}/videos?api_key=${API_KEY}&language=en-US`
  //   );
  //   const data = await response.json();
  //   data.results.map(({ name, key }) => {
  //     if (name === "Official Trailer") {
  // setVideoKey(key);
  //     }
  //   });
  // };

  // const getSimilarMovies = async () => {
  //   const response = await fetch(
  //     `https://api.themoviedb.org/3/${mediatype}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
  //   );
  //   const data = await response.json();
  //   // dispatch({
  //   //   type: "SIMILAR_MOVIES",
  //   //   payload: data.results,
  //   // });
  // };

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        fetchMovies,
        searchMovies,
        movie: state.movie,
        genere: state.genere,
        movieGenre,
        getData,
        videoKey,
        similarMovies: state.similarMovies,
        mediatype,
        getSimilarData,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;
