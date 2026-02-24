/**
 * Item retornado na listagem de pokémons
 */
export interface PokemonListItem {
  name: string;
  url: string;
}

/**
 * Resposta do endpoint /pokemon
 */
export interface PokemonListResponse {
  results: PokemonListItem[];
}

/**
 * Tipo individual do pokémon
 */
export interface PokemonType {
  type: {
    name: string;
  };
}

/**
 * Estrutura usada na tela de detalhes
 */
export interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
}