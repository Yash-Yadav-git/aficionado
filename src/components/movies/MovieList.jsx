import { useContext, useEffect } from "react";
import MoviesContext from "../../context/MoviesContext";
import NotFound from "../../pages/NotFound";
import MovieItems from "./MovieItems";

const MovieList = () => {
  const { movies, fetchMovies, getGenere, genere } = useContext(MoviesContext);

  useEffect(() => {
    fetchMovies();
    getGenere();
    // console.log(movies, genere);
    localStorage.setItem("movieData", JSON.stringify(movies));
    localStorage.setItem("genre-list", JSON.stringify(genere));
  }, []);

  return (
    <>
      <div className="grid-cols-3 grid gap-4 m-6">
        {movies.map((movieData) => {
          return <MovieItems movieData={movieData} />;
        })}
      </div>
    </>
  );
};

export default MovieList;
