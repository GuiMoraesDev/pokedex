"use client";

import { ChangeEvent, useCallback, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { GetPokemonListProps } from "../@types";

type Props = {
  initialData?: GetPokemonListProps;
};

export default function PokemonList({ initialData }: Props) {
  const [filteredList, setFilteredList] = useState(initialData);

  const handleFilterList = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      const isSearchAnInteger = Number.isInteger(Number(value));

      const filteredResults = value
        ? initialData?.results.filter((pokemon) =>
            isSearchAnInteger
              ? pokemon.pokeNumber.includes(value)
              : pokemon.name.includes(value.toLowerCase())
          )
        : initialData?.results;

      setFilteredList((state) => ({ ...state, results: filteredResults }));
    },
    [initialData?.results]
  );

  return (
    <>
      <input
        className="rounded-md border-2 p-2 w-full max-w-3xl"
        type="search"
        placeholder="Search by pokemon name or number"
        onChange={(e) => handleFilterList(e)}
      />

      <div className="container grid select-none grid-cols-3 gap-8 w-full">
        {filteredList.results.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <div className="will-change-all container relative flex flex-col items-center justify-evenly rounded-md border-2 p-6 text-xl transition-all duration-200 hover:scale-105">
              <Image
                className="min-h-fit aspect-square w-auto"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                width="0"
                height={150}
                sizes="100%"
                priority={Number(pokemon.id) < 12}
              />
              <p className="select-text text-center capitalize text-slate-900">
                {pokemon.name}
              </p>
              <span className="absolute top-1 right-1 select-text text-center text-slate-600">
                {pokemon.pokeNumber}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
