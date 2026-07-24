"use client";

import { useRef, ElementType, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  direction?: "up" | "down" | "left" | "right";
  /** Allows skipping autoAlpha animation */
  fade?: boolean;
};

export default function Reveal({ 
  children, 
  className = "", 
  delay = 0, 
  as: Tag = "div", 
  direction = "up",
  fade = true 
}: RevealProps) {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = container.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let x = 0;
      let y = 0;

      if (direction === "up") y = 40;
      if (direction === "down") y = -40;
      if (direction === "left") x = 40;
      if (direction === "right") x = -40;

      const fromVars: gsap.TweenVars = { x, y };
      if (fade) fromVars.autoAlpha = 0;

      const toVars: gsap.TweenVars = {
        x: 0,
        y: 0,
        duration: 1.2,
        delay: delay / 1000,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      };
      if (fade) toVars.autoAlpha = 1;

      gsap.fromTo(el, fromVars, toVars);
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (fade) {
        gsap.fromTo(
          el,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.5,
            delay: delay / 1000,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, { scope: container });

  // Render children immediately, GSAP handles the initial state (autoAlpha: 0/1) based on the timeline
  return (
    <Tag ref={container} className={`${fade ? "invisible" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
