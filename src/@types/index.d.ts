export type PokemonProps = {
  id: string;
  pokeNumber: string;
  name: string;
  url: string;
};

export type GetPokemonListProps = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<PokemonProps>;
};
