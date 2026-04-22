import { Link } from "react-router-dom";
import { ShieldCheck, Truck, CreditCard, RotateCcw, Star, ArrowRight, Quote } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { AnnouncementMarquee } from "@/components/site/AnnouncementMarquee";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const Index = () => {
  return (
    <SiteLayout>
      <Hero />
      <AnnouncementMarquee />

      {/* Security banner */}
      <section className="container py-12">
        <div className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-elegant">
          <div className="h-14 w-14 rounded-full bg-accent grid place-items-center shrink-0">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-display text-xl md:text-2xl font-bold">
              Sem pagamento na entrega — mais segurança e rapidez
            </h3>
            <p className="text-sm opacity-80 mt-1">
              Compra online com segurança — envio imediato após pagamento confirmado.
            </p>
          </div>
          <Button asChild variant="gold" size="lg">
            <Link to="/shipping">
              Saber mais <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Products */}
      <section className="container py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest">A nossa coleção</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2">
            Massage guns <span className="italic text-accent">premium</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Tecnologia profissional num design pensado para a tua recuperação diária.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Why COVIA */}
      <section className="bg-gradient-soft py-20">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest">Porquê COVIA</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2">
              Construída para quem leva a recuperação a sério.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Cada COVIA é testada em laboratório e aprovada por fisioterapeutas. Motores brushless silenciosos,
              materiais premium e uma garantia que cobre até 3 anos de utilização intensa.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { n: "+15.000", l: "Clientes felizes" },
                { n: "4.9/5", l: "Avaliação média" },
                { n: "65 dB", l: "Silenciosa" },
                { n: "3 anos", l: "Garantia" },
              ].map((s) => (
                <div key={s.l} className="bg-background border border-border rounded-xl p-4 shadow-card">
                  <div className="font-display text-2xl font-bold text-accent">{s.n}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { Icon: Truck, t: "Envio em 24-48h", d: "Após confirmação de pagamento" },
              { Icon: ShieldCheck, t: "Pagamento blindado", d: "Stripe + PayPal + MB Way" },
              { Icon: RotateCcw, t: "7 dias devolução", d: "Sem perguntas, sem stress" },
              { Icon: CreditCard, t: "Garantia COVIA", d: "Cobertura até 3 anos" },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="bg-background rounded-2xl p-6 border border-border shadow-card">
                <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-primary">{t}</h3>
                <p className="text-xs text-muted-foreground mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest">Quem usa, recomenda</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2">
            +15.000 atletas confiam na COVIA
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              n: "Mariana S.",
              r: "Corredora amadora",
              t: "Mudou completamente a minha recuperação pós-treino. A COVIA Pro é silenciosa e poderosa — perfeita.",
            },
            {
              n: "Tiago F.",
              r: "Personal trainer",
              t: "Recomendo a todos os meus clientes. A bateria dura imenso e a entrega foi super rápida.",
            },
            {
              n: "Joana M.",
              r: "Fisioterapeuta",
              t: "Uso a Elite no consultório todos os dias. Acabamento profissional e os pacientes adoram o resultado.",
            },
          ].map((rev) => (
            <div key={rev.n} className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <Quote className="h-8 w-8 text-accent mb-4" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm leading-relaxed">{rev.t}</p>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="font-semibold text-sm">{rev.n}</div>
                <div className="text-xs text-muted-foreground">{rev.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container pb-20">
        <div className="bg-gradient-hero rounded-3xl p-10 md:p-16 text-center shadow-elegant relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest">Oferta termina hoje</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mt-3">
              Até <span className="text-accent">30% OFF</span> em toda a coleção
            </h2>
            <p className="text-primary-foreground/80 mt-4 max-w-xl mx-auto">
              Stock limitado. Envio imediato após confirmação de pagamento.
            </p>
            <Button asChild variant="gold" size="xl" className="mt-8">
              <Link to="/shop">
                Comprar agora <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
