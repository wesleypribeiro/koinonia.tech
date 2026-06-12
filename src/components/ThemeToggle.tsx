"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Alterna entre tema claro/escuro adicionando a classe `.dark` no <html> e persistindo em localStorage. */
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      aria-pressed={isDark}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
    >
      {/* Evita mismatch de hidratação: só mostra o ícone após montar */}
      {mounted ? (
        isDark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />
      ) : (
        <span className="h-5 w-5" />
      )}
    </button>
  );
}
