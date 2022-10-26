import { ImageLoaderProps } from "next/image";

export const pokeImageLoader = ({ src }: ImageLoaderProps) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${src}`;
};
