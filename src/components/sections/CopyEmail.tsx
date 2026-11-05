"use client";

import { useEffect, useRef, useState } from "react";
import { buttonClasses } from "../ui";

/** Copia o email e mostra a confirmação por 2 segundos. */
export function CopyEmail({ email, label, copied }: { email: string; label: string; copied: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const field = document.createElement("textarea");
      field.value = email;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setDone(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 2000);
  }

  return (
    <>
      <button type="button" onClick={copy} className={buttonClasses("secondary")}>
        {done ? copied : label}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {done ? copied : ""}
      </span>
    </>
  );
}
