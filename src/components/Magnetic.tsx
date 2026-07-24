"use client";

import { useRef, useEffect, ReactNode, ElementType } from "react";
import gsap from "gsap";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export default function Magnetic({ children, className = "", as: Tag = "div" }: MagneticProps) {
  const magnetic = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = magnetic.current;
    if (!el) return;

    // Utilize gsap.quickTo for better performance
    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Limit movement for a subtle effect
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    // Use matchMedia to respect reduced motion
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <Tag ref={magnetic} className={className || "inline-block"}>
      {children}
    </Tag>
  );
}
