"use client";

import { useCallback, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { getPokemonListData, POKE_QTD } from "../../services/api.pokemon";
import PokeCard from "../PokeCard";

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

  const handleFirstPage = useCallback(() => {
    setOffset((state) => state > 0 && 0);
  }, []);

  const handlePrevPage = useCallback(() => {
    setOffset((state) => state > 0 && --state);
  }, []);

  const handleNextPage = useCallback(() => {
    if (data.results.length < data.count) setOffset((state) => ++state);
  }, [data?.count, data?.results.length]);

  const handleLastPage = useCallback(() => {
    if (data.results.length < data.count)
      setOffset((data.count - POKE_QTD) / POKE_QTD);
  }, [data?.count, data?.results.length]);

  return (
    <>
      <Input
        type="search"
        placeholder="Search by pokemon name or number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="container grid w-full select-none grid-cols-3 gap-6 overflow-y-auto overflow-x-hidden scroll-smooth p-2 scrollbar-none">
        {filteredList?.results.map((pokemon, index) => (
          <PokeCard index={index} key={pokemon.id} {...pokemon} />
        ))}
      </div>

      <section className="container flex w-full items-center justify-between">
        <p>
          Page {Math.floor(offset + 1)} of {Math.floor(data?.count / POKE_QTD)}
        </p>

        <nav className="flex gap-4">
          <Button
            type="button"
            onClick={handleFirstPage}
            disabled={offset <= 0}
          >
            <span className="ph-caret-double-left" />
          </Button>

          <Button type="button" onClick={handlePrevPage} disabled={offset <= 0}>
            <span className="ph-caret-left" />
          </Button>

          <Button
            type="button"
            onClick={handleNextPage}
            disabled={offset * POKE_QTD + POKE_QTD >= data?.count}
          >
            <span className="ph-caret-right" />
          </Button>

          <Button
            type="button"
            onClick={handleLastPage}
            disabled={offset * POKE_QTD + POKE_QTD >= data?.count}
          >
            <span className="ph-caret-double-right" />
          </Button>
        </nav>
      </section>
    </>
  );
}
