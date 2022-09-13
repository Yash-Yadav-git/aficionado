const SimilarMovies = ({ movieData }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  console.log(movieData.backdrop_path);

  return (
    <>
      <div className="card flex-shrink-0 w-80 rounded-lg bg-base-300 shadow-xl m-6 ">
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
        <div className="card-body bg-base-200 flex flex-row justify-between">
          {movieData.title ? (
            <h2 className="card-title">{movieData.title}</h2>
          ) : (
            <h2 className="card-title">{movieData.name}</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default SimilarMovies;
