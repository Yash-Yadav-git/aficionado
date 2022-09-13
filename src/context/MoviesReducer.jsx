const MoviesReducer = (state, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return {
        ...state,
        movies: action.payload,
        isloading: false,
      };
    case "GET_TRENDING_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };
    case "GET_TRENDING_SHOWS":
      return {
        ...state,
        movies: action.payload,
      };
    case "SEARCH_RESULTS":
      return {
        ...state,
        movies: action.payload,
        isloading: false,
      };
    case "SET_MOVIE":
      return {
        ...state,
        movie: action.payload,
      };
    case "IS_LOADING":
      return {
        isloading: true,
      };
    case "GET_GENRE":
      return {
        ...state,
        genere: action.payload,
      };
    case "SIMILAR_MOVIES":
      return {
        ...state,
        similarMovies: action.payload,
      };
    default:
      return state;
  }
};

export default MoviesReducer;
