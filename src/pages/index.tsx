import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";

import { getPokemonList } from "../services/api.pokemon";
import { getPokemonIdByUrl } from "../utils/getPokemonIdByUrl";
import PokeCard from "../components/PokeCard";

const Home: NextPage = () => {
  const { data } = useQuery(["pokemon"], getPokemonList);

  return (
    <div>
      <header>
        <h1 className="bold text-center text-6xl">Pokédex</h1>
      </header>

      <input className="p-2" type="text" />

      <div className="container m-auto grid grid-cols-3 gap-4 p-3">
        {data?.results.map((item, index) => {
          const id = getPokemonIdByUrl(item.url);

          return <PokeCard key={id} id={id} name={item.name} />;
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
