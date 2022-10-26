import { ChangeEvent, useCallback, useState } from "react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type { NextPage } from "next";

import PokeCard from "../components/PokeCard";

import { getPokemonList } from "../services/api.pokemon";

const Home: NextPage = () => {
  const { data } = useQuery(["pokemon"], getPokemonList, {
    staleTime: 24 * 60 * 60 * 1000, //24 hours
    refetchOnWindowFocus: false,
  });

  const [filteredResults, setFilteredResults] = useState(data?.results);

  const handleFilterPokemon = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      const isNaN = Number.isNaN(Number(value));

      setFilteredResults(() =>
        value
          ? data?.results.filter((pokemon) =>
              isNaN
                ? pokemon.name.includes(value.toLowerCase())
                : pokemon.pokeNumber.includes(value)
            )
          : data?.results
      );
    },
    [data?.results]
  );

  return (
    <div className="container m-auto flex w-full max-w-5xl flex-col justify-center gap-4">
      <header>
        <h1 className="bold text-center text-6xl">Pokédex</h1>
      </header>

      <input
        className="rounded-md border-2 p-2"
        type="text"
        placeholder="Search by pokemon name"
        onChange={handleFilterPokemon}
      />

      <div className="container grid grid-cols-3 content-end items-end justify-end gap-4">
        {filteredResults?.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <PokeCard {...pokemon} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["pokemon"], getPokemonList);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
