import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import MoviesContext from "../../context/MoviesContext";
import PropTypes from "prop-types";
import Movie from "./Movie";

const MovieItems = ({ movieData }) => {
  const { title, poster_path, name, id, media_type } = movieData;
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const { movie, setMovie, genere, mapGenre, getData } =
    useContext(MoviesContext);

  useEffect(() => {
    getData(id, media_type);
  }, []);
  const handleClick = () => {
    // setMovie(movieData);
    getData(id, media_type);
    localStorage.setItem("single-movie", JSON.stringify(movieData));
    // mapGenre(genre_ids);
  };

  return (
    <>
      <Link to={`show/${media_type}/${id}`} onClick={() => handleClick()}>
        <div className="card w-96 rounded-lg bg-base-100 shadow-xl m-6 ">
          <figure>
            {poster_path ? (
              <img src={IMAGE_PATH + poster_path}></img>
            ) : (
              <img src={IMAGE_PATH + "/6NR0k3A7Rk10XOiDOxSrmprFu93.jpg"}></img>
            )}
          </figure>
          <div className="card-body bg-base-200 flex flex-row justify-between">
            {title ? (
              <h2 className="card-title">{title}</h2>
            ) : (
              <h2 className="card-title">{name}</h2>
            )}
            {/* <h2 className="card-title">{title}</h2> */}
            <div className="crad-actions justify-end"></div>
          </div>
        </div>
      </Link>
    </>
  );
};

MovieItems.propTypes = {
  movieData: PropTypes.object,
};

// MovieItems.defaultProp = {
//   movieData: {
//     poster_path:
//       "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWUlMjBub3QlMjBmb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
//   },
// };

MovieItems.defaultProps = {
  movieData: {
    poster_path: "/6NR0k3A7Rk10XOiDOxSrmprFu93.jpg",
  },
};

export default MovieItems;
