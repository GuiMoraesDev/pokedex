import { ArrowArcLeft } from "phosphor-react";
import Image from "next/image";
import Link from "next/link";

import { getSinglePokemon } from "../../services/api.pokemon";
import { pokeImageLoader } from "../../utils/pokeImageLoader";
import { pokeTypes } from "../../utils/pokeTypes";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const PokemonDetail = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery([`pokemon_${id}`], () =>
    getSinglePokemon(String(id))
  );

  console.log(data);

  return (
    <div className="container m-auto flex h-full w-full flex-col items-center justify-center">
      <Link
        href="/"
        className="will-change-all fixed top-4 left-4 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105"
      >
        <ArrowArcLeft /> Back
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
          loader={pokeImageLoader}
          src={`${id}.png`}
          alt={data?.name || String(id)}
          width="0"
          height={150}
          sizes="100%"
          priority={Number(id) < 12}
        />

        <p className="text-2xl font-medium capitalize text-slate-900">
          {data?.name}
        </p>

        <div className="flex flex-col items-center justify-center gap-px">
          <p>Weight: {data?.weight! / 10} kilograms</p>
          <p>Height: {data?.height! / 10} centimeters</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
