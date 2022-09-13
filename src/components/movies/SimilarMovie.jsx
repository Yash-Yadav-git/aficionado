import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import MoviesContext from "../../context/MoviesContext";
import Movie from "./Movie";

const SimilarMovie = () => {
  const { similarMovies } = useContext(MoviesContext);
  return <Movie movieData={similarMovies} />;
};

export default SimilarMovie;
