import { useContext } from "react";
import MoviesContext from "../../context/MoviesContext";

const Categories = () => {
  const { getTrendingMovies, fetchMovies, getTrendingShows } =
    useContext(MoviesContext);

  const handleMoviesChange = () => {
    getTrendingMovies();
  };

  const handleallChange = () => {
    fetchMovies();
  };

  const handleShowChange = () => {
    getTrendingShows();
  };

  return (
    <div className=" bg-base-300 flex flex-row justify-start">
      <div
        className="btn btn-ghost btn-lg normal-case"
        onClick={handleMoviesChange}
      >
        Popular Movies
      </div>
      <div
        className="btn btn-ghost btn-lg normal-case"
        onClick={handleShowChange}
      >
        Popular TV Shows
      </div>
      <div
        className="btn btn-ghost btn-lg normal-case"
        onClick={handleallChange}
      >
        Trending Shows & Movies
      </div>
    </div>
  );
};

export default Categories;
