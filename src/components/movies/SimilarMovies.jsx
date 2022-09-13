import { useContext } from "react";
import { useParams, useNavigate, useHistory } from "react-router-dom";
import MoviesContext from "../../context/MoviesContext";

const SimilarMovies = ({ movieData }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  const { getSimilarData, mediatype } = useContext(MoviesContext);

  const handleClick = () => {
    navigate({
      pathname: "/similar-movies",
    });
    getSimilarData(movieData.id, mediatype);
    document.documentElement.scrollTop = 0;
  };
  const navigate = useNavigate();

  return (
    <>
      <div onClick={() => handleClick()}>
        <div
          className="card flex-shrink-0  w-80 rounded-lg shadow-xl shadow-black m-6"
          onClick={handleClick}
        >
          <div className="flex flex-col">
            <figure className="rounded-lg max-h-96	">
              {movieData.poster_path ? (
                <img
                  className="h-full w-full"
                  src={IMAGE_PATH + movieData.poster_path}
                ></img>
              ) : (
                <img
                  clasName="h-full w-full"
                  src={IMAGE_PATH + "/5UKLqsKJIhouJPVr8AQSTuh7S4n.jpg"}
                ></img>
              )}
            </figure>
            <div className="card-body text-black flex  flex-row justify-between align-strech">
              {movieData.title ? (
                <h2 className="card-title mt-8  flex-shrink-1">
                  {movieData.title}
                </h2>
              ) : (
                <h2 className="card-title mt-8 flex-shrink-1">
                  {movieData.name}
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimilarMovies;
