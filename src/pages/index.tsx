import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { NextPage } from "next";

import { useQuery } from "@tanstack/react-query";
import Image from "next/future/image";
import Link from "next/link";
import { getPokemonList } from "../services/api.pokemon";
import { getPokemonIdByUrl } from "../utils/getPokemonIdByUrl";
import { ChangeEvent, useCallback, useState } from "react";

const Home: NextPage = () => {
  const { data } = useQuery(["pokemon"], getPokemonList);

  const ArtworkTypes = {
    "official-artwork": (id: string) =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    dream_world: (id: string) =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
  };

  const [selectedArtWork, setSelectedArtWork] =
    useState<keyof typeof ArtworkTypes>("dream_world");

  const handleSelectArtwork = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      setSelectedArtWork(value as keyof typeof ArtworkTypes);
    },
    []
  );

  return (
    <div>
      <header>
        <h1 className="bold text-center text-6xl">Pokédex</h1>
      </header>

      <select onChange={handleSelectArtwork}>
        {Object.keys(ArtworkTypes).map((key) => (
          <option key={key}>{key}</option>
        ))}
      </select>

      <div className="container m-auto grid grid-cols-3 gap-2 p-2">
        {data?.results.map((item) => {
          const id = getPokemonIdByUrl(item.url);

          return (
            <Link key={item.name} href="/">
              <a className="container flex flex-col items-center justify-center rounded-md border-2 p-3 transition-transform hover:scale-105">
                <Image
                  src={ArtworkTypes[selectedArtWork](id)}
                  alt={item.name}
                  width={150}
                  height={150}
                />
                <p className="text-center capitalize">{item.name}</p>
              </a>
            </Link>
          );
        })}
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
