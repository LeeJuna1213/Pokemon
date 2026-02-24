import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getPokemonList } from "../../api/pokemonService";
import type { PokemonListItem, PokemonListResponse } from "../../types/pokemon.ts";

import { getPokemonImage } from "../../utils/getPokemonImage";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const data: PokemonListResponse = await getPokemonList();
        setPokemons(data.results);
      } catch (error) {
        console.error("Erro ao buscar pokémons", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Carregando Pokédex...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100">
      {/* Header */}
      <header className="bg-red-500 py-6 shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white">Pokédex</h1>
        <p className="text-center text-red-100 mt-1">Primeira geração</p>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full max-w-7xl">
          {pokemons.map((pokemon) => (
            <div
              key={pokemon.name}
              onClick={() => navigate(`/pokemon/${pokemon.name}`)}
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 p-4 text-center"
            >
              <img
                src={getPokemonImage(pokemon.url)}
                alt={pokemon.name}
                className="mx-auto h-24 w-24 object-contain"
              />
              <p className="capitalize mt-3 font-semibold text-gray-800">{pokemon.name}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}