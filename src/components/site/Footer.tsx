import { Link } from "react-router-dom";
import { CreditCard, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      {/* Trust strip */}
      <div className="border-b border-primary-foreground/10">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
          {[
            { Icon: Truck, t: "Envio rápido", s: "24-48h após pagamento" },
            { Icon: ShieldCheck, t: "Pagamento seguro", s: "SSL & antifraude" },
            { Icon: RotateCcw, t: "7 dias devolução", s: "Sem perguntas" },
            { Icon: CreditCard, t: "Garantia COVIA", s: "Até 3 anos" },
          ].map(({ Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-accent/20 grid place-items-center text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">{t}</div>
                <div className="text-xs opacity-70">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container grid md:grid-cols-4 gap-10 py-16">
        <div>
          <div className="font-display text-3xl font-bold mb-4">
            COVIA<span className="text-accent">.</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Massage guns premium para recuperação muscular profissional. Compra 100% segura, envio imediato após
            pagamento confirmado.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-accent">Loja</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/shop">Todos os produtos</Link></li>
            <li><Link to="/shop">Mais vendidos</Link></li>
            <li><Link to="/shop">Novidades</Link></li>
            <li><Link to="/shop">Acessórios</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-accent">Apoio</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/shipping">Política de envio</Link></li>
            <li><Link to="/shipping">Devoluções</Link></li>
            <li><Link to="/about">Garantia</Link></li>
            <li><Link to="/about">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-accent">Newsletter</h4>
          <p className="text-sm opacity-70 mb-3">Recebe 20% OFF na 1ª compra.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="O teu email"
              className="flex-1 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 px-3 py-2 text-sm placeholder:opacity-50"
            />
            <button className="bg-accent text-accent-foreground px-4 rounded-md text-sm font-semibold hover:bg-accent-glow transition-colors">
              OK
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} COVIA. Todos os direitos reservados. Pagamento antecipado obrigatório.
      </div>
    </footer>
  );
};