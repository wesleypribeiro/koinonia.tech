"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";
import Brand from "./Brand";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Fecha o menu ao trocar de rota
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Fecha o menu ao pressionar ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Brand />

        {/* Navegação desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    active ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Controles mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
          >
            {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Painel mobile */}
      {open && (
        <ul
          id="mobile-menu"
          className="border-t border-border bg-background px-4 py-3 sm:px-6 md:hidden"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-md px-3 py-2.5 text-base font-medium transition-colors ${
                    active ? "bg-muted text-primary" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
