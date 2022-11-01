import ReactQueryContext from "../src/context/ReactQueryContext";
import PokemonList from "../src/patterns/PokemonList";

export default function Page() {
  return (
    <main className="container m-auto flex min-h-screen h-full max-w-3xl flex-col items-start justify-start gap-8 p-6">
      <h1 className="text-4xl font-bold">Pokédex</h1>

      <p className="text-slate-600">
        Gives background information on the habitat or activities of a Pokemon
        in the wild or the other information on the Pokemon history or anatomy
      </p>

      <div className="container m-auto flex h-full flex-col items-start justify-center gap-8 pb-6">
        <ReactQueryContext>
          <PokemonList />
        </ReactQueryContext>
      </div>
    </main>
  );
}
