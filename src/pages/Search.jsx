import React from "react";
import { useContext } from "react";
import MovieList from "../components/movies/MovieList";
import MoviesContext from "../context/MoviesContext";
import NotFound from "./NotFound";

const Search = () => {
  const { movies } = useContext(MoviesContext);

  return <>{movies.length === 0 ? <NotFound /> : <MovieList />}</>;
};

export default Search;
