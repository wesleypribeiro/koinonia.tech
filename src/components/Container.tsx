import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** Largura máxima + padding horizontal responsivo, centralizado. */
export default function Container({ children, className = "", as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
