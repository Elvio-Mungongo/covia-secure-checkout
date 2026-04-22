import { ShieldCheck, Truck, CreditCard, RotateCcw, Ban, Clock } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

const Shipping = () => (
  <SiteLayout>
    <section className="bg-gradient-soft py-16 border-b border-border">
      <div className="container max-w-3xl text-center">
        <h1 className="font-display text-5xl font-bold text-primary">Envio & Pagamento</h1>
        <p className="text-muted-foreground mt-4">
          Política transparente — porque a tua segurança é a nossa prioridade.
        </p>
      </div>
    </section>

    <section className="container py-16 max-w-4xl">
      <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-10 shadow-elegant mb-12">
        <div className="flex items-start gap-4">
          <Ban className="h-10 w-10 text-accent shrink-0" />
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Não trabalhamos com pagamento na entrega
            </h2>
            <p className="opacity-90 mt-3 leading-relaxed">
              Todos os pedidos da COVIA são enviados <strong>apenas após confirmação do pagamento</strong>. Não
              trabalhamos com pagamento na entrega para garantir maior eficiência logística, evitar fraudes e oferecer
              o serviço mais rápido possível aos nossos clientes.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {[
          { Icon: CreditCard, t: "Pagamento antecipado obrigatório", d: "Cartão, MB Way ou PayPal — escolhe o método que preferires no checkout." },
          { Icon: ShieldCheck, t: "Transações 100% seguras", d: "Stripe e PayPal processam o teu pagamento com encriptação SSL e proteção antifraude." },
          { Icon: Truck, t: "Envio em 24-48h úteis", d: "Após confirmação do pagamento, o teu pedido é despachado dentro de 24 a 48h." },
          { Icon: RotateCcw, t: "7 dias para devolução", d: "Não ficaste satisfeito? Devolves dentro de 7 dias e recebes o reembolso integral." },
          { Icon: Clock, t: "Entrega: 2-5 dias úteis", d: "Em Portugal continental. Ilhas e estrangeiro podem demorar mais alguns dias." },
          { Icon: ShieldCheck, t: "Garantia COVIA", d: "Todos os produtos têm garantia de 2 a 3 anos contra defeitos de fabrico." },
        ].map(({ Icon, t, d }) => (
          <div key={t} className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center mb-4">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-bold text-primary">{t}</h3>
            <p className="text-sm text-muted-foreground mt-2">{d}</p>
          </div>
        ))}
      </div>

      <div className="bg-secondary/50 rounded-2xl p-8">
        <h3 className="font-display text-2xl font-bold text-primary mb-4">Como funciona o nosso fluxo</h3>
        <ol className="space-y-4">
          {[
            "Escolhes o teu produto e adicionas ao carrinho.",
            "Vais para o checkout seguro — uma única página, rápida e simples.",
            "Pagas com cartão, MB Way ou PayPal — pagamento obrigatório no momento da compra.",
            "Recebes confirmação por email assim que o pagamento for aprovado.",
            "Enviamos o teu pedido em 24-48h. Recebes em 2-5 dias úteis.",
          ].map((step, i) => (
            <li key={i} className="flex gap-4">
              <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground font-bold grid place-items-center shrink-0">
                {i + 1}
              </div>
              <p className="text-sm pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  </SiteLayout>
);

export default Shipping;