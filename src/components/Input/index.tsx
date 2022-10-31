import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full max-w-3xl rounded-md border-2 p-2 focus:outline-none focus:ring focus:ring-blue-400"
      tab-index={1}
      {...props}
    />
  );
}
