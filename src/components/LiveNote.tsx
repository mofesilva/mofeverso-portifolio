"use client";

import { useEffect, useState } from "react";

/** Notas vivas da ficha: hora em Belo Horizonte e tempo de casa. Só aparecem depois de montar, para não divergir do servidor. */
export function LiveNote({ kind, since = 2021 }: { kind: "time" | "years"; since?: number }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      if (kind === "time") {
        const hm = new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
        }).format(now);
        setText(`agora são ${hm}`);
      } else {
        const years = now.getFullYear() - since;
        setText(years <= 1 ? "1 ano de casa" : `${years} anos de casa`);
      }
    };
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, [kind, since]);

  return <span className="tabular-nums">{text}</span>;
}
