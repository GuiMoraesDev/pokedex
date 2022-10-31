import PokemonList from "../src/components/PokemonList";
import { getPokemonListData } from "../src/services/api.pokemon";

export default async function Page() {
  const initialData = await getPokemonListData();

  return (
    <div className="container m-auto flex max-w-3xl flex-col justify-center items-center gap-8 px-6 pb-6">
      <header>
        <h1 className="bold text-center text-6xl">Pokédex</h1>
      </header>
      <PokemonList initialData={initialData} />
    </div>
  );
}
