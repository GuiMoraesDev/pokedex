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
        className="rounded-md border-2 p-2"
        type="text"
        placeholder="Search by pokemon name or number"
        onChange={(e) => handleFilterList(e)}
      />

      <div className="container grid grid-cols-3 content-end items-end justify-end gap-4">
        {filteredList.results.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <div className="will-change-all container flex flex-1 flex-col items-center justify-evenly rounded-md border-2 p-4 text-xl transition-all duration-200 hover:scale-105">
              <Image
                className="h-36 w-auto"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                width="0"
                height={150}
                sizes="100%"
                priority={Number(pokemon.id) < 12}
              />
              <p className="text-center capitalize text-slate-900">
                {pokemon.name}
              </p>
              <p className="text-center text-slate-600">{pokemon.pokeNumber}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
