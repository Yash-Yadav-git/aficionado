import { useContext, useEffect } from "react";
import MoviesContext from "../../context/MoviesContext";
import NotFound from "../../pages/NotFound";
import MovieItems from "./MovieItems";
import { useNavigate } from "react-router-dom";
import BackgroundSlider from "react-background-slider";

const MovieList = () => {
  const { movies, fetchMovies, genere } = useContext(MoviesContext);

  // const goTo = () => {
  //   console.log("In goto");
  //   navigate({
  //     pathname: "/not-found",
  //   });
  // };
  // const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
    // getGenere();
    // console.log(movies, genere);
    localStorage.setItem("movieData", JSON.stringify(movies));
    localStorage.setItem("genre-list", JSON.stringify(genere));
  }, []);

  return (
    <>
      {movies.length > 0 ? (
        <div className=" grid-cols-1 grid md:grid-cols-2 grid gap-2 xl:grid-cols-3 grid gap-3">
          {movies.map((movieData) => {
            return <MovieItems movieData={movieData} />;
          })}
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default MovieList;
