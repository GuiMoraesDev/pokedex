export const getPokemonIdByUrl = (url: string): string => {
  const urlWithoutSlashes = url.replace(/\//g, "");

  const [_, id] = urlWithoutSlashes.split("pokemon");

  return id;
};
