import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MoviesContext from "../../context/MoviesContext";

const NavBar = () => {
  const { searchMovies } = useContext(MoviesContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // useEffect(() => {
  //   if (searchTerm !== "") {
  //     searchMovies(searchTerm);
  //   }
  //   setTimeout(() => setSearchTerm(""), 5000);
  //   // setSearchTerm("");
  // }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(searchTerm);
    setSearchTerm("");
  };

  return (
    <div className="w-full navbar bg-base-200">
      <div className="w-full flex justify-between">
        <Link to="/" className="text-3xl m-4 p-2">
          Movie Mania
        </Link>
        <div className="form-control">
          <Link to="/search">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search Movie.."
                className="input input-bordered input-m rounded-lg"
                onChange={handleChange}
                value={searchTerm}
              />
            </form>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
