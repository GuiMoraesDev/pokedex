import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md bg-blue-800 p-4 font-semibold text-neutral-100 transition-all duration-200 will-change-auto focus:outline-none focus:ring focus:ring-blue-400 disabled:cursor-not-allowed disabled:bg-slate-400 hover:bg-blue-600 "
      {...props}
    />
  );
}
