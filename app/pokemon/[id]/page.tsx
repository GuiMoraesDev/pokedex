import Image from "next/image";
import Link from "next/link";

import { getSinglePokemon } from "../../../src/services/api.pokemon";
import { pokeTypes, statsTypes } from "../../../src/utils/pokeTypes";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const data = await getSinglePokemon(params.id);

  return (
    <div
      className={`relative grid h-screen w-screen select-none grid-cols-1 grid-rows-2 items-center justify-center gap-2 p-2 ${
        pokeTypes[data?.types[0].type.name].gradient
      }`}
    >
      <Link
        href="/"
        replace
        className="will-change-all fixed top-4 left-4 z-10 flex items-center justify-center gap-2 rounded-full bg-white p-2 font-semibold transition-all duration-200 hover:scale-105"
      >
        <span className="ph-arrow-arc-left" /> Back
      </Link>

      <div
        className={`container relative m-auto flex h-full w-full max-w-xl flex-col items-center justify-center gap-3 overflow-hidden rounded-md border-2 p-3 ${
          pokeTypes[data?.types[0].type.name].border
        } ${pokeTypes[data?.types[0].type.name].light}`}
      >
        <span className="absolute top-1 right-1 translate-x-1/3 translate-y-1/3 rotate-45 select-text border-2 border-blue-800 bg-yellow-400 px-12 py-1 text-sm font-semibold">
          {data?.pokeNumber}
        </span>

        <Image
          className="h-72 w-auto"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
          alt={data?.name}
          width="0"
          height={150}
          sizes="100%"
          priority
        />

        <div className="flex gap-2">
          {data?.types.map((type) => (
            <p
              key={type.slot}
              className={`${pokeTypes[type.type.name].regular} border-2 ${
                pokeTypes[type.type.name].border
              } ml-auto inline-flex items-center justify-center  rounded-full py-2 px-4 font-medium capitalize text-white`}
            >
              {type.type.name}
            </p>
          ))}
        </div>

        <p className="select-text text-2xl font-medium capitalize text-slate-900">
          {data?.name}
        </p>

        <div className="flex flex-col items-center justify-center gap-px">
          <p className="select-text">Weight: {data?.weight! / 10} kilograms</p>
          <p className="select-text">
            Height: {data?.height! / 10} centimeters
          </p>
        </div>
      </div>

      <ul
        className={`container relative m-auto grid h-full w-full max-w-xl grid-cols-2 grid-rows-3 items-center justify-between gap-4 overflow-hidden`}
      >
        {data.stats.map((stat) => {
          const statName = stat.stat.name.replace(/-/g, " ");

          return (
            <li
              key={stat.stat.name}
              className={`container relative flex h-full w-full flex-col items-center justify-center gap-4 rounded-md ${
                statsTypes[stat.stat.name]
              }`}
            >
              <p className="text-center font-semibold capitalize text-white">
                {statName}
              </p>
              <p className="text-center font-bold capitalize text-white">
                {stat.base_stat}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
