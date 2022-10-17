import Link from "next/link";
import Image from "next/future/image";

type Props = {
  id: string;
  name: string;
};

const PokeCard = ({ id, name }: Props): JSX.Element => {
  const PokeNumber = id.padStart(3, "0");

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link key={name} href="/">
      <a className="will-change-all container flex max-w-xs flex-1 flex-col items-center justify-evenly rounded-md border-2 p-4 text-xl transition-all duration-200 hover:scale-105">
        <Image
          className="h-36 w-auto"
          src={imageUrl}
          alt={name}
          width="0"
          height={150}
          sizes="100%"
        />
        <p className="text-center capitalize text-slate-900">{name}</p>
        <p className="text-center text-slate-600">{PokeNumber}</p>
      </a>
    </Link>
  );
};

export default PokeCard;
