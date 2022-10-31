import ReactQueryContext from "../src/context/ReactQueryContext";
import PokemonList from "../src/patterns/PokemonList";

export default function Page() {
  return (
    <main className="container m-auto flex h-screen max-w-3xl flex-col items-center justify-center gap-8 overflow-hidden">
      <header>
        <h1 className="bold text-center text-6xl text-yellow-400">Pokédex</h1>
      </header>

      <ReactQueryContext>
        <PokemonList />
      </ReactQueryContext>
    </main>
  );
}
