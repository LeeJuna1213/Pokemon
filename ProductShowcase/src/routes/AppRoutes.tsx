import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import PokemonDetails from "../pages/Home/PokemonDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}