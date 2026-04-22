import { SiteLayout } from "@/components/site/SiteLayout";

const About = () => (
  <SiteLayout>
    <section className="bg-gradient-soft py-20 border-b border-border">
      <div className="container max-w-3xl text-center">
        <p className="text-accent text-sm font-semibold uppercase tracking-widest">A nossa história</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-primary mt-3">
          Construímos a <span className="italic text-accent">COVIA</span> para quem leva a recuperação a sério.
        </h1>
      </div>
    </section>
    <section className="container py-16 max-w-3xl space-y-6 text-lg leading-relaxed">
      <p>
        A COVIA nasceu da necessidade de oferecer recuperação muscular profissional ao alcance de todos. Cansados de
        massage guns barulhentas, frágeis e com bateria fraca, criámos a nossa própria gama — testada por
        fisioterapeutas, validada por atletas e desenhada para durar.
      </p>
      <p>
        Cada COVIA passa por <strong>187 testes de qualidade</strong> antes de sair da fábrica. É essa exigência que
        nos permite oferecer garantias até 3 anos e uma política de devolução sem perguntas.
      </p>
      <p>
        Acreditamos que a confiança começa na transparência. Por isso, todos os pedidos são pagos antecipadamente — não
        existem entregas misteriosas, taxas escondidas ou compromissos vagos. Pagas, enviamos, recebes.
      </p>
    </section>
  </SiteLayout>
);

export default About;