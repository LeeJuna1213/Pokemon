import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getPokemonByName } from "../../../api/pokemonService";
import type { PokemonDetails } from "../../../types/pokemon";

export default function PokemonDetailsPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      if (!name) return;

      try {
        const data: PokemonDetails = await getPokemonByName(name);
        setPokemon(data);
      } catch (error) {
        console.error("Erro ao buscar Pokémon", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [name]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="text-center mt-10">
        <p>Pokémon não encontrado</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-red-500 font-medium hover:underline"
      >
        ← Voltar
      </button>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 text-center">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-48 h-48 mx-auto"
        />

        <h1 className="text-3xl font-bold capitalize mt-4">
          {pokemon.name}
        </h1>

        <div className="flex justify-center gap-2 mt-4">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium capitalize"
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-semibold">Altura</p>
            <p>{pokemon.height / 10} m</p>
          </div>
          <div>
            <p className="font-semibold">Peso</p>
            <p>{pokemon.weight / 10} kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}