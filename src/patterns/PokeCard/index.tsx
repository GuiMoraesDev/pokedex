import Image from "next/image";
import Link from "next/link";

import { PokemonProps } from "../../@types";

type Props = PokemonProps & {
  index: number;
};

export default function PokeCard({ index, ...props }: Props) {
  return (
    <Link
      href={`/pokemon/${props.id}`}
      className="will-change-all container  relative flex flex-col items-center justify-evenly gap-2 overflow-hidden rounded-md border-2 border-blue-600 bg-red-500 p-6 text-xl transition-all duration-200 focus:scale-105 focus:bg-red-400 focus:outline-none focus:ring focus:ring-blue-400 hover:scale-105 hover:border-blue-600 hover:bg-red-400"
    >
      <span className="absolute top-1 right-1 translate-x-1/3 translate-y-1/3 rotate-45 select-text border-2 border-blue-800 bg-yellow-400 px-12 py-1 text-sm font-semibold">
        {props.pokeNumber}
      </span>

      <Image
        className="aspect-square w-auto"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`}
        alt={props.name}
        width="0"
        height={150}
        sizes="100%"
        priority={index < 12}
      />

      <p className="text-stale-800 select-text text-center capitalize">
        {props.name}
      </p>
    </Link>
  );
}
