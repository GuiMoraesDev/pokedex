"use client";

import { ChangeEvent, useCallback, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { getPokemonListData } from "../../services/api.pokemon";
import PokeCard from "../PokeCard";

export default function PokemonList() {
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(36);
  const [search, setSearch] = useState("");

  const { data } = useQuery(
    ["pokemon", offset, itemsPerPage],
    async () => getPokemonListData(offset, itemsPerPage),
    {
      keepPreviousData: true,
    }
  );

  const filteredList = useMemo(() => {
    const isSearchAnInteger = Number.isInteger(Number(search));

    if (search) {
      return {
        ...data,
        results: data?.results.filter((pokemon) =>
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
    if (data?.results.length < data?.count) setOffset((state) => ++state);
  }, [data?.count, data?.results.length]);

  const handleLastPage = useCallback(() => {
    if (data?.results.length < data?.count)
      setOffset((data?.count - itemsPerPage) / itemsPerPage);
  }, [data?.count, data?.results.length, itemsPerPage]);

  return (
    <>
      <Input
        type="search"
        placeholder="Search by pokemon name or number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <header className="flex items-center justify-center gap-2">
        Items per page
        <label className="flex items-center justify-center gap-px">
          <input
            type="radio"
            name="items-page"
            checked={itemsPerPage === 9}
            value={9}
            onChange={() => setItemsPerPage(9)}
          />
          9
        </label>
        <label className="flex items-center justify-center gap-px">
          <input
            type="radio"
            name="items-page"
            checked={itemsPerPage === 18}
            value={18}
            onChange={() => setItemsPerPage(18)}
          />
          18
        </label>
        <label className="flex items-center justify-center gap-px">
          <input
            type="radio"
            name="items-page"
            checked={itemsPerPage === 36}
            value={36}
            onChange={() => setItemsPerPage(36)}
          />
          36
        </label>
        <label className="flex items-center justify-center gap-px">
          <input
            type="radio"
            name="items-page"
            checked={itemsPerPage === 54}
            value={54}
            onChange={() => setItemsPerPage(54)}
          />
          54
        </label>
      </header>

      <div className="container grid h-full w-full select-none grid-cols-3 gap-4 overflow-y-auto scroll-smooth p-2">
        {filteredList?.results.length ? (
          filteredList?.results.map((pokemon, index) => (
            <PokeCard index={index} key={pokemon.id} {...pokemon} />
          ))
        ) : (
          <p>No pokemon founded</p>
        )}
      </div>

      <section className="container flex w-full items-center justify-between">
        <p>
          Page {Math.floor(offset + 1)} of{" "}
          {Math.floor(data?.count / itemsPerPage)}
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
            disabled={offset * itemsPerPage + itemsPerPage >= data?.count}
          >
            <span className="ph-caret-right" />
          </Button>

          <Button
            type="button"
            onClick={handleLastPage}
            disabled={offset * itemsPerPage + itemsPerPage >= data?.count}
          >
            <span className="ph-caret-double-right" />
          </Button>
        </nav>
      </section>
    </>
  );
}
