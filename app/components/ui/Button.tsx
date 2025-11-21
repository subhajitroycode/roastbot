import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-neutral-500/60 border-2 border-neutral-300 hover:border-neutral-100 rounded-full h-12 w-12 flex justify-center items-center text-neutral-300 hover:text-neutral-100 cursor-pointer hover:bg-neutral-500/60 transition-colors"
    >
      {children}
    </button>
  );
}
