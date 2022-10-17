import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { NextPage } from "next";
import { getPokemonList } from "../src/services/api.pokemon";

import HomePage from "../src/views/Home";

const Home: NextPage = () => {
  return <HomePage />;
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["pokemon"], () => getPokemonList());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
