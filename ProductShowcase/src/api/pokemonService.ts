import axios from "axios";

/**
 * Instância base do axios para a PokeAPI
 */
export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

/**
 * Busca a lista inicial de pokémons (limitada a 151)
 */
export const getPokemonList = async () => {
  const response = await api.get("/pokemon", {
    params: {
      limit: 151,
    },
  });

  return response.data;
};

/**
 * Busca os dados completos de um pokémon pelo nome
 */
export const getPokemonByName = async (name: string) => {
  const response = await api.get(`/pokemon/${name}`);
  return response.data;
};