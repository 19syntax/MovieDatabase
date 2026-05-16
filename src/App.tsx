import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MovieDetails from "./pages/MovieDetails";
import { FavouriteProvider } from "./context/Favourite";
import { FavouritePage } from "./pages/FavouritePage";

export default function App() {
  return (
    <div>
      <FavouriteProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favourite" element={<FavouritePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </FavouriteProvider>
    </div>
  );
}
