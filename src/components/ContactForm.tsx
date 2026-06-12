"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function ContactForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Contato pelo site — ${nome || "Sem nome"}`;
    const body = `Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const fieldClass =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-fg/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-foreground">
          Nome
        </label>
        <input
          id="nome"
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium text-foreground">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          required
          rows={5}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Conte sobre o seu projeto..."
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-fg transition-colors hover:bg-primary-hover sm:w-auto"
      >
        <Send className="h-4 w-4" aria-hidden />
        Enviar mensagem
      </button>

      <p className="text-xs text-muted-fg">
        Ao enviar, será aberto o seu aplicativo de e-mail com a mensagem pronta.
      </p>
    </form>
  );
}
