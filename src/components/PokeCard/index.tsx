import Image from "next/image";
import { PokemonProps } from "../../services/api.pokemon";
import { pokeImageLoader } from "../../utils/pokeImageLoader";

const PokeCard = ({ id, pokeNumber, name }: PokemonProps): JSX.Element => {
  return (
    <div className="will-change-all container flex flex-1 flex-col items-center justify-evenly rounded-md border-2 p-4 text-xl transition-all duration-200 hover:scale-105">
      <Image
        className="h-36 w-auto"
        loader={pokeImageLoader}
        src={`${id}.png`}
        alt={name}
        width="0"
        height={150}
        sizes="100%"
        priority={Number(id) < 12}
      />
      <p className="text-center capitalize text-slate-900">{name}</p>
      <p className="text-center text-slate-600">{pokeNumber}</p>
    </div>
  );
};

export default PokeCard;
