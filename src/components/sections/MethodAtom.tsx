import { HAIRLINE_VERSIONS } from "@/content/hairline-versions";

/**
 * Átomo da seção Método, desenhado com a skill Hairline (hairline/atom.js) e
 * servido como página própria em public/hairline/atomo.html. A versão na URL
 * evita que o navegador mostre uma cópia antiga em cache.
 * O átomo anterior está em MethodOrbit.tsx e em backup/atomo-anterior.
 */
export function MethodAtom() {
  return (
    <iframe
      src={`/hairline/atomo.html?v=${HAIRLINE_VERSIONS.atomo}`}
      title="Átomo: orbes em órbita de um núcleo. Passe o cursor sobre uma órbita para desacelerar o orbe."
      loading="lazy"
      className="mx-auto block aspect-[5/4] w-full max-w-[680px] border-0"
    />
  );
}
