import Image from "next/image";
import Link from "next/link";

import { getSinglePokemon } from "../../../src/services/api.pokemon";
import { pokeTypes } from "../../../src/utils/pokeTypes";

type Props = {
  params: { id: string };
  searchParams: {};
};

export default async function Page({ params }: Props) {
  const data = await getSinglePokemon(params.id);

  return (
    <div className="container m-auto flex h-full w-full select-none flex-col items-center justify-center">
      <Link
        href="/"
        className="will-change-all fixed top-4 left-4 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105"
      >
        <span className="ph-arrow-arc-left" /> Back
      </Link>

      <div
        className={`container relative flex max-w-sm flex-col items-center justify-center gap-4 p-4`}
      >
        <span className="ml-auto rounded-full border bg-slate-600 py-2 px-4 font-medium text-slate-100">
          {data?.pokeNumber}
        </span>

        <div className="flex gap-2">
          {data?.types.map((type) => (
            <p
              key={type.slot}
              className={`${pokeTypes.get(
                type.type.name
              )} ml-auto inline-flex items-center justify-center  rounded-full py-2 px-4 font-medium capitalize text-white`}
            >
              {type.type.name}
            </p>
          ))}
        </div>

        <Image
          className="h-72 w-auto"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
          alt={data?.name}
          width="0"
          height={150}
          sizes="100%"
          priority
        />

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
    </div>
  );
}
