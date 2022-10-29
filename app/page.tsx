import PokemonList from "../src/components/PokemonList";
import { getPokemonListData } from "../src/services/api.pokemon";

export default async function Page() {
  const initialData = await getPokemonListData();

  return (
    <div className="container m-auto flex w-full max-w-5xl flex-col justify-center gap-4">
      <header>
        <h1 className="bold text-center text-6xl">Pokédex</h1>
      </header>
      <PokemonList initialData={initialData} />
    </div>
  );
}
