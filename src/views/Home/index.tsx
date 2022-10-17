import { useQuery } from "@tanstack/react-query";
import Image from "next/future/image";
import { getPokemonList } from "../../services/api.pokemon";
import { getPokemonIdByUrl } from "../../utils/getPokemonIdByUrl";

const HomePage = (): JSX.Element => {
  const { data } = useQuery(["pokemon"], () => getPokemonList());

  return (
    <div className="container columns-2">
      {data?.results.map((item) => {
        const id = getPokemonIdByUrl(item.url);

        return (
          <div key={item.name}>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={item.name}
              width={150}
              height={150}
            />
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
