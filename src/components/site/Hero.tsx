import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-massage-gun.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-soft">
      {/* Decorative dots */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--primary) / 0.1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="container relative grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
        <div className="space-y-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2 shadow-card">
            <div className="h-6 w-6 rounded-full bg-gradient-gold grid place-items-center">
              <Sparkles className="h-3 w-3 text-primary" />
            </div>
            <span className="text-xs font-medium">Recuperação muscular profissional</span>
          </div>

          <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.05] text-primary">
            A tua melhor <span className="text-accent italic">recuperação</span>{" "}
            começa aqui
          </h1>

          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Massage guns COVIA — alívio muscular profundo, design premium e a tecnologia que os atletas profissionais
            usam.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/shop">
                Comprar agora <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Link
              to="/shop"
              className="text-sm font-semibold underline underline-offset-4 hover:text-accent transition-colors"
            >
              Ver todos os produtos
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="bg-background/80 backdrop-blur rounded-xl border border-border px-4 py-3 flex items-center gap-3 shadow-card">
              <Truck className="h-5 w-5 text-accent" />
              <div>
                <div className="text-xs font-semibold">Envio imediato</div>
                <div className="text-[10px] text-muted-foreground">após pagamento</div>
              </div>
            </div>
            <div className="bg-background/80 backdrop-blur rounded-xl border border-border px-4 py-3 flex items-center gap-3 shadow-card">
              <Shield className="h-5 w-5 text-accent" />
              <div>
                <div className="text-xs font-semibold">Pagamento seguro</div>
                <div className="text-[10px] text-muted-foreground">SSL + antifraude</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-gradient-gold opacity-30 blur-2xl" />
          <div className="absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-elegant">
            <img
              src={heroImg}
              alt="COVIA massage gun premium em ambiente natural"
              className="h-full w-full object-cover"
              width={1280}
              height={1280}
            />
          </div>
          {/* badge */}
          <div className="absolute -bottom-6 left-6 bg-background rounded-2xl shadow-elegant px-5 py-3 border border-border">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">A partir de</div>
            <div className="font-display text-2xl font-bold text-primary">
              €119<span className="text-sm text-muted-foreground line-through ml-2">€159</span>
            </div>
          </div>
          <div className="absolute top-6 right-6 h-24 w-24 rounded-full bg-accent text-accent-foreground grid place-items-center shadow-gold rotate-12">
            <div className="text-center">
              <div className="font-display text-xl font-bold leading-none">-30%</div>
              <div className="text-[9px] uppercase tracking-wider mt-1">OFF hoje</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};