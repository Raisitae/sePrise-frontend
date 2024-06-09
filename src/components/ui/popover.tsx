import React, { useState, ReactNode, MouseEvent } from "react";

interface PopoverProps {
  children: ReactNode;
}

interface PopoverTriggerProps {
  children: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PopoverContentProps {
  children: ReactNode;
  isOpen: boolean;
}

export function Popover({ children }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<any>, {
          isOpen,
          setIsOpen,
        })
      )}
    </div>
  );
}

export function PopoverTrigger({ children, setIsOpen }: PopoverTriggerProps) {
  return (
    <div
      onClick={(e: MouseEvent<HTMLDivElement>) => setIsOpen((open) => !open)}>
      {children}
    </div>
  );
}

export function PopoverContent({ children, isOpen }: PopoverContentProps) {
  return (
    isOpen && (
      <div className="absolute z-10 mt-2 w-auto p-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
        {children}
      </div>
    )
  );
}
