import { Navigate, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage, SearchPage, PokemonPage } from "./pages/";


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path="pokemon/:id" element={<PokemonPage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>

      <Route path="" element={<Navigate to="/" />} />
    </Routes>
  );
};
