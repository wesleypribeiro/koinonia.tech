"use client";

import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "unconfigured";
  const [state, handleSubmit, reset] = useForm(formId, {
    data: {
      subject: "Novo contato pelo site da Koinonia Tech",
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    },
  });

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.succeeded && successRef.current) {
      successRef.current.focus();
    } else if (state.errors && errorRef.current) {
      errorRef.current.focus();
    }
  }, [state.succeeded, state.errors]);

  const handleReset = () => {
    setNome("");
    setEmail("");
    setMensagem("");
    reset();
  };

  if (formId === "unconfigured" && process.env.NODE_ENV === "development") {
    console.warn("Formspree Form ID não configurado.");
  }

  const fieldClass =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-fg/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed";

  if (state.succeeded) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-8 text-center outline-none"
        aria-live="polite"
      >
        <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-foreground">Mensagem enviada com sucesso!</h3>
        <p className="text-sm text-muted-fg">Recebemos sua mensagem e entraremos em contato em breve.</p>
        <button
          onClick={handleReset}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-fg transition-colors hover:bg-primary-hover"
        >
          Enviar nova mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-live="polite">
      {state.errors && (
        <div
          ref={errorRef}
          tabIndex={-1}
          className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-500 outline-none"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <h4 className="text-sm font-medium">Não foi possível enviar sua mensagem.</h4>
            <p className="mt-1 text-xs">
              Verifique sua conexão e tente novamente. Caso o problema continue, fale conosco pelo WhatsApp.
            </p>
          </div>
        </div>
      )}

      {/* Honeypot field */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="companyWebsite">Não preencha este campo</label>
        <input
          id="companyWebsite"
          type="text"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          className={fieldClass}
          aria-invalid={!!state.errors}
          aria-describedby="name-error"
          disabled={state.submitting}
        />
        <ValidationError
          prefix="Nome"
          field="name"
          errors={state.errors}
          className="mt-1.5 text-xs text-red-500"
          id="name-error"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          className={fieldClass}
          aria-invalid={!!state.errors}
          aria-describedby="email-error"
          disabled={state.submitting}
        />
        <ValidationError
          prefix="E-mail"
          field="email"
          errors={state.errors}
          className="mt-1.5 text-xs text-red-500"
          id="email-error"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Conte sobre o seu projeto..."
          className={`${fieldClass} resize-y`}
          aria-invalid={!!state.errors}
          aria-describedby="message-error"
          disabled={state.submitting}
        />
        <ValidationError
          prefix="Mensagem"
          field="message"
          errors={state.errors}
          className="mt-1.5 text-xs text-red-500"
          id="message-error"
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-fg transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {state.submitting ? "Enviando..." : "Enviar mensagem"}
      </button>

      <p className="text-xs text-muted-fg">
        Seus dados serão utilizados apenas para responder ao seu contato.
      </p>
    </form>
  );
}
