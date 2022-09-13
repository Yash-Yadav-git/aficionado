import { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import MoviesContext from "../../context/MoviesContext";
import SimilarMovies from "./SimilarMovies";

import { useParams } from "react-router-dom";

const Movie = () => {
  const {
    movie,
    getVideo,
    videoKey,
    getSimilarMovies,
    similarMovies,
    getData,
  } = useContext(MoviesContext);
  const { mediaType, movieId } = useParams();
  console.log(movieId);
  useEffect(() => {
    getData(movieId, mediaType);
    getVideo();
    getSimilarMovies();
  }, []);

  // console.log(movie);
  // const [movieData, setMovieData] = useState([]);
  // const [itemGenre, setItemGenre] = useState([]);
  // var genre = [];
  // useLayoutEffect(() => {
  //   setMovieData(JSON.parse(localStorage.getItem("single-movie")));
  //   const { name } = JSON.parse(localStorage.getItem("movie-genre"));
  //   setItemGenre(name);
  // }, []);

  // const handleLoad = () => {
  //   const { name } = JSON.parse(localStorage.getItem("movie-genre"));
  //   setItemGenre(name);
  // };

  const {
    title,
    name,
    overview,
    vote_average,
    poster_path,
    id,
    release_date,
    popularity,
    backdrop_path,
    genres,
  } = movie;

  const showGenre = () => {
    return genres.map(({ name }) => {
      return <div className="text-3xl flex felx-row">{name}</div>;
    });
  };

  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const youtubeURL = `https://www.youtube.com/watch?v=${videoKey}`;

  return (
    <>
      <div className="flex flex-row bg-base-100 mx-auto">
        {/* child one */}
        <div className="card movie-image mt-5 rounded-lg basis-1/5 ml-5	">
          <figure>
            <img className="w-full h-full" src={IMAGE_PATH + poster_path}></img>
          </figure>
        </div>
        {/* child two */}
        <div className="info-left basis-2/5	">
          <div className="flex flex-row m-4 items-start">
            <div className="flex flex-col items-start m-2 space-y-12">
              <div className="text-2xl font-bold">Title</div>
              <div className="text-2xl font-bold">Released Date </div>
              <div className="text-2xl font-bold">Rating</div>
              <div className="text-2xl font-bold">Genre</div>
            </div>
            <div className="flex flex-col items-start m-2 ml-12 space-y-12 ">
              {title ? (
                <div className="text-2xl">{title}</div>
              ) : (
                <div className="text-2xl">{name}</div>
              )}

              <div className="text-2xl">{release_date}</div>
              <div className="text-2xl">{vote_average}</div>
              {genres ? (
                <div className="text-2xl">{showGenre()}</div>
              ) : (
                <div className="text-2xl">Not Found</div>
              )}
            </div>
          </div>
        </div>
        {/* child-three */}
        <div className="info-right basis-2/5 mt-5 tracking-widest leading-relaxed">
          {overview}
          <a href={youtubeURL} target="_blank" className="mr-2">
            <button className="btn btn-primary mt-10 mb-5 mr-5">
              Watch Trailer on Youtube
            </button>
          </a>
        </div>
      </div>

      {/* Trailer */}
      {/* <div className="btn btn-primary">Watch Trailer</div> */}
      {/* <a href={youtubeURL} target="_blank">
        <button className="w-full btn btn-primary mt-5 mb-5">
          Watch Trailer on Youtube
        </button>
      </a> */}

      <iframe
        className="w-full mt-5 mb-5"
        width="1000"
        height="480"
        src={`https://www.youtube.com/embed/${videoKey}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />

      {similarMovies ? (
        <>
          <div className="flex h-16 text-5xl p-2 justify-center align-center mb-2">
            Similar movies
          </div>
          <div className="flex flex-row overflow-x-auto">
            {similarMovies.map((movieData) => {
              return <SimilarMovies movieData={movieData} />;
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Movie;
