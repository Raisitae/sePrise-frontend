import React, { ReactNode, MouseEvent } from "react";

interface SelectItemProps {
  value: string;
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export function SelectItem({ value, children, onClick }: SelectItemProps) {
  return (
    <div
      className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
      onClick={onClick}>
      {children}
    </div>
  );
}
