import { getPokemonIdByUrl } from "../utils/getPokemonIdByUrl";
import { api } from "./api";

export interface PokemonProps {
  id: string;
  pokeNumber: string;
  name: string;
  url: string;
}
export interface GetPokemonProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonProps[];
}

export const getPokemonList = async () => {
  const response = await api.get<GetPokemonProps>("/pokemon");

  const data = {
    ...response.data,
    results: response.data.results.map((pokemon) => {
      const id = getPokemonIdByUrl(pokemon.url);

      return { ...pokemon, id, pokeNumber: id.padStart(3, "0") };
    }),
  };

  return data;
};

interface PokemonAbilitiesProps {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonFormsProps {
  name: string;
  url: string;
}

interface PokemonGameIndicesProps {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface PokemonMovesProps {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

interface PokemonSpeciesProps {
  name: string;
  url: string;
}

interface PokemonVersionsSpritesProps {
  back_default: string | null;
  back_gray: string | null;
  back_transparent: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  back_shiny: string | null;
  back_shiny_transparent: string | null;
  front_default: string | null;
  front_gray: string | null;
  front_transparent: string | null;
  front_shiny: string | null;
  front_shiny_transparent: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
}

interface PokemonSpritesProps {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    "official-artwork": {
      front_default: string | null;
    };
  };
  versions: {
    "generation-i": {
      "red-blue": PokemonVersionsSpritesProps;
      yellow: PokemonVersionsSpritesProps;
    };
    "generation-ii": {
      crystal: PokemonVersionsSpritesProps;
      gold: PokemonVersionsSpritesProps;
      silver: PokemonVersionsSpritesProps;
    };
    "generation-iii": {
      emerald: PokemonVersionsSpritesProps;
      "firered-leafgreen": PokemonVersionsSpritesProps;
      "ruby-sapphire": PokemonVersionsSpritesProps;
    };
    "generation-iv": {
      "diamond-pearl": PokemonVersionsSpritesProps;
      "heartgold-soulsilver": PokemonVersionsSpritesProps;
      platinum: PokemonVersionsSpritesProps;
    };
    "generation-v": {
      "black-white": PokemonVersionsSpritesProps & {
        animated: PokemonVersionsSpritesProps;
      };
    };
    "generation-vi": {
      "omegaruby-alphasapphire": PokemonVersionsSpritesProps;
      "x-y": PokemonVersionsSpritesProps;
    };
    "generation-vii": {
      icons: PokemonVersionsSpritesProps;
      "ultra-sun-ultra-moon": PokemonVersionsSpritesProps;
    };
    "generation-viii": {
      icons: PokemonVersionsSpritesProps;
    };
  };
}

interface PokemonStatsProps {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonTypesProps {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface GetSinglePokemonProps {
  abilities: PokemonAbilitiesProps[];
  base_experience: number;
  forms: PokemonFormsProps[];
  game_indices: PokemonGameIndicesProps[];
  height: number;
  held_items: string[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMovesProps[];
  name: string;
  order: number;
  past_types: string[];
  species: PokemonSpeciesProps;
  sprites: PokemonSpritesProps;
  stats: PokemonStatsProps[];
  types: PokemonTypesProps[];
  weight: number;
}

export const getSinglePokemon = async (id: string) => {
  const response = await api.get<GetSinglePokemonProps>(`/pokemon/${id}`);

  return response.data;
};
