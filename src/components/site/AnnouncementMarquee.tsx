import { Zap } from "lucide-react";

const items = [
  "ENVIO IMEDIATO APÓS PAGAMENTO",
  "GARANTIA COVIA ATÉ 3 ANOS",
  "7 DIAS PARA DEVOLUÇÃO",
  "PAGAMENTO 100% SEGURO",
  "ENVIO GRÁTIS ACIMA DE €99",
];

export const AnnouncementMarquee = () => (
  <div className="bg-accent text-accent-foreground overflow-hidden border-y border-primary/10">
    <div className="flex animate-marquee whitespace-nowrap py-3">
      {[...items, ...items, ...items].map((t, i) => (
        <span key={i} className="mx-8 inline-flex items-center gap-3 text-sm font-semibold tracking-wider">
          <Zap className="h-4 w-4" />
          {t}
        </span>
      ))}
    </div>
  </div>
);