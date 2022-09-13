import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MoviesContext from "../../context/MoviesContext";
import { FaFontAwesome } from "react-icons/fa";

const NavBar = () => {
  const { searchMovies, fetchMovies } = useContext(MoviesContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      searchMovies(searchTerm);
    }
    // setTimeout(() => setSearchTerm(""), 10000);
    // setSearchTerm("");
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(searchTerm);
    // setSearchTerm("");
  };

  const handleCategoryChange = (e) => {
    const buttonCategoryClicked = e.target.id;
    fetchMovies(buttonCategoryClicked);
  };

  return (
    <div className="w-full navbar bg-accent shadow-xl shadow-black rounded-lg">
      <div className="container mx-auto w-full flex justify-between">
        <Link
          id="title"
          to="/"
          className="text-3xl m-4 p-2 btn btn-accent btn-lg rounded-lg "
          onClick={handleCategoryChange}
        >
          Movie Mania
        </Link>

        <div className="hidden lg:flex flex-row justify-start shrink">
          <Link to="/">
            <div
              id="poular-movies"
              value="poular-movies"
              className=" ml-2 btn btn-accent btn-lg normal-case"
              onClick={handleCategoryChange}
            >
              Popular Movies
            </div>
          </Link>
          <Link to="/">
            <div
              id="popular-tv-shows"
              value="popular-tv-shows"
              className="ml-2  btn btn-accent btn-lg normal-case"
              onClick={handleCategoryChange}
            >
              Popular TV Shows
            </div>
          </Link>
          <Link to="/">
            <div
              id="popular-tv-and-movie"
              value="popular-tv-and-movie"
              className="ml-2 btn btn-accent btn-lg normal-case"
              onClick={handleCategoryChange}
            >
              Trending Shows & Movies
            </div>
          </Link>
        </div>

        <div className="form-control">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Movie.."
              className="input input-bordered input-m rounded-lg"
              onChange={handleChange}
              value={searchTerm}
            />
          </form>
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
