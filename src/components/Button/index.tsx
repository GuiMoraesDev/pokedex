import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="rounded-md bg-blue-800 p-4 font-semibold text-neutral-100 transition-all duration-200 will-change-auto focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-slate-400 hover:bg-blue-600"
      {...props}
    />
  );
}
