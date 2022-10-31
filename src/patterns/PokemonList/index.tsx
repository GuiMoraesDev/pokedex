"use client";

import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { getPokemonListData } from "../../services/api.pokemon";
import PokeCard from "../PokeCard";

export default function PokemonList() {
  const pokeWrapperListRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [search, setSearch] = useState("");

  const { data } = useQuery(
    ["pokemon", offset, itemsPerPage],
    async () => {
      pokeWrapperListRef.current?.scroll({
        top: 0,
        behavior: "smooth",
      });
      return getPokemonListData(offset, itemsPerPage);
    },
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
    if (offset > 0) {
      setOffset(0);
      pokeWrapperListRef.current?.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [offset]);

  const handlePrevPage = useCallback(() => {
    if (offset > 0) {
      setOffset((state) => --state);
      pokeWrapperListRef.current?.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [offset]);

  const handleNextPage = useCallback(() => {
    if (data?.results.length < data?.count) {
      setOffset((state) => ++state);
      pokeWrapperListRef.current?.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [data?.count, data?.results.length]);

  const handleLastPage = useCallback(() => {
    if (data?.results.length < data?.count) {
      setOffset((data?.count - itemsPerPage) / itemsPerPage);
      pokeWrapperListRef.current?.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
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

      <div
        className="grid h-full w-full select-none gap-4 overflow-y-auto scroll-smooth p-2 sm:grid-cols-1 md:grid-cols-3"
        ref={pokeWrapperListRef}
      >
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
