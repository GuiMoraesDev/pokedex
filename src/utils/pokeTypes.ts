import { PokemonTypesProps } from "../services/api.pokemon";

export const pokeTypes: Map<PokemonTypesProps["type"]["name"], string> =
  new Map([
    ["bug", "bg-emerald-600"],
    ["dark", "bg-neutral-600"],
    ["dragon", "bg-indigo-600"],
    ["electric", "bg-yellow-600"],
    ["fairy", "bg-rose-500"],
    ["fighting", "bg-amber-800"],
    ["fire", "bg-red-600"],
    ["flying", "bg-zinc-600"],
    ["ghost", "bg-purple-900"],
    ["grass", "bg-lime-600"],
    ["ground", "bg-yellow-800"],
    ["ice", "bg-teal-600"],
    ["normal", "bg-amber-600"],
    ["poison", "bg-violet-600"],
    ["psychic", "bg-violet-900"],
    ["rock", "bg-yellow-800"],
    ["steel", "bg-neutral-600"],
    ["water", "bg-blue-600"],
  ]);
