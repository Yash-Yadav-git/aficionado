import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import { MoviesProvider } from "./context/MoviesContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Movie from "./components/movies/Movie";
import Categories from "./components/layout/Categories";

function App() {
  return (
    <>
      <MoviesProvider>
        <BrowserRouter>
          <NavBar />
          <Categories />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="not-found" element={<NotFound />} />
            <Route path="search" element={<Search />} />
            <Route
              path="/search/show/:mediaType/:movieId"
              element={<Movie />}
            />
            <Route path="show/:mediaType/:movieId" element={<Movie />} />
          </Routes>
        </BrowserRouter>
      </MoviesProvider>
    </>
  );
}

export default App;
