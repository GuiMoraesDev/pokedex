"use client";

import { useCallback, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import Button from "../components/Button";
import Input from "../components/Input";
import PokeCard from "../components/PokeCard";
import { getPokemonListData } from "../services/api.pokemon";

export default function PokemonList() {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const { data } = useQuery(
    ["pokemon", offset],
    async () => getPokemonListData(offset),
    {
      keepPreviousData: true,
    }
  );

  const filteredList = useMemo(() => {
    const isSearchAnInteger = Number.isInteger(Number(search));

    if (search) {
      return {
        ...data,
        results: data.results.filter((pokemon) =>
          isSearchAnInteger
            ? pokemon.pokeNumber.includes(search)
            : pokemon.name.includes(search.toLowerCase())
        ),
      };
    }

    return data;
  }, [data, search]);

  const handlePrevPage = useCallback(() => {
    setOffset((state) => state > 0 && --state);
  }, []);

  const handleNextPage = useCallback(() => {
    setOffset((state) => data.results.length < data.count && ++state);
  }, [data?.count, data?.results.length]);

  return (
    <div className="container m-auto flex h-screen max-w-3xl flex-col items-start justify-center gap-8 overflow-hidden">
      <Input
        type="search"
        placeholder="Search by pokemon name or number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="container grid w-full select-none grid-cols-3 gap-8 overflow-y-auto overflow-x-hidden scroll-smooth p-2 scrollbar-none">
        {filteredList?.results.map((pokemon, index) => (
          <PokeCard index={index} key={pokemon.id} {...pokemon} />
        ))}
      </div>

      <nav className="container flex w-full items-center justify-between">
        <Button type="button" onClick={handlePrevPage} disabled={offset <= 0}>
          Previous page
        </Button>

        <Button
          type="button"
          onClick={handleNextPage}
          disabled={data?.results.length >= data?.count}
        >
          Next page
        </Button>
      </nav>
    </div>
  );
}
