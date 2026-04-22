import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, Truck, Star, Zap, CreditCard, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const methods = [
  { id: "card", label: "Cartão de crédito/débito", desc: "Visa, Mastercard, Amex" },
  { id: "mbway", label: "MB Way", desc: "Pagamento instantâneo" },
  { id: "paypal", label: "PayPal", desc: "Conta PayPal ou cartão" },
];

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const shipping = subtotal > 99 ? 0 : 4.99;
  const total = subtotal + shipping;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("O teu carrinho está vazio");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Pagamento aprovado! 🎉 O teu pedido será enviado em 24-48h.");
      clear();
      navigate("/");
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="container py-24 text-center space-y-6">
          <h1 className="font-display text-4xl font-bold text-primary">Carrinho vazio</h1>
          <p className="text-muted-foreground">Adiciona produtos antes de finalizar a compra.</p>
          <Button asChild variant="hero" size="lg"><Link to="/shop">Ver produtos</Link></Button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="bg-gradient-soft py-10 border-b border-border">
        <div className="container">
          <h1 className="font-display text-4xl font-bold text-primary">Checkout seguro</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-success">
            <Lock className="h-4 w-4" />
            <span>Pagamento 100% seguro — encriptação SSL</span>
          </div>
        </div>
      </section>

      <form onSubmit={submit} className="container py-10 grid lg:grid-cols-[1fr_400px] gap-10">
        {/* Left — form */}
        <div className="space-y-8">
          {/* Contact */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <h2 className="font-display text-xl font-bold text-primary mb-4">1. Contacto</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" required placeholder="o.teu@email.com" />
              </div>
              <div className="space-y-1.5">
                <Label>Telemóvel</Label>
                <Input type="tel" required placeholder="+351 9XX XXX XXX" />
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <h2 className="font-display text-xl font-bold text-primary mb-4">2. Morada de envio</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Nome</Label><Input required /></div>
              <div className="space-y-1.5"><Label>Apelido</Label><Input required /></div>
              <div className="sm:col-span-2 space-y-1.5"><Label>Morada</Label><Input required /></div>
              <div className="space-y-1.5"><Label>Cidade</Label><Input required /></div>
              <div className="space-y-1.5"><Label>Código postal</Label><Input required placeholder="0000-000" /></div>
              <div className="sm:col-span-2 space-y-1.5"><Label>País</Label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option>Portugal</option><option>Espanha</option><option>França</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <h2 className="font-display text-xl font-bold text-primary mb-4">3. Pagamento</h2>
            <div className="space-y-3">
              {methods.map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    method === m.id ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    value={m.id}
                    checked={method === m.id}
                    onChange={(e) => setMethod(e.target.value)}
                    className="accent-accent"
                  />
                  <CreditCard className="h-5 w-5 text-accent" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{m.label}</div>
                    <div className="text-xs text-muted-foreground">{m.desc}</div>
                  </div>
                  {method === m.id && <Check className="h-4 w-4 text-success" />}
                </label>
              ))}
            </div>

            {method === "card" && (
              <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                <div className="sm:col-span-2 space-y-1.5"><Label>Número do cartão</Label><Input placeholder="0000 0000 0000 0000" /></div>
                <div className="space-y-1.5"><Label>Validade</Label><Input placeholder="MM/AA" /></div>
                <div className="space-y-1.5"><Label>CVC</Label><Input placeholder="123" /></div>
              </div>
            )}

            <div className="bg-destructive/5 border border-destructive/20 rounded-lg px-4 py-3 mt-6 text-sm flex items-center gap-2">
              <Zap className="h-4 w-4 text-destructive shrink-0" />
              <span>
                <strong>Sem pagamento na entrega.</strong> O teu pedido só é enviado após pagamento aprovado.
              </span>
            </div>
          </div>
        </div>

        {/* Right — summary */}
        <aside className="lg:sticky lg:top-32 self-start space-y-4">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-elegant">
            <h3 className="font-display text-lg font-bold text-primary mb-4">Resumo do pedido</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((it) => (
                <div key={it.product.id} className="flex gap-3">
                  <div className="relative">
                    <img src={it.product.image} alt="" className="h-16 w-16 rounded-lg object-cover bg-secondary" />
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center">
                      {it.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="font-semibold">{it.product.name}</div>
                    <div className="text-muted-foreground text-xs">€{it.product.price} x {it.quantity}</div>
                  </div>
                  <div className="font-semibold text-sm">€{(it.product.price * it.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>€{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between">
                <span>Envio</span>
                <span className={shipping === 0 ? "text-success font-semibold" : ""}>
                  {shipping === 0 ? "Grátis" : `€${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-display text-xl font-bold text-primary pt-2 border-t border-border">
                <span>Total</span><span>€{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Reviews near button */}
            <div className="bg-secondary/50 rounded-lg p-3 my-4 text-xs">
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                ))}
                <span className="font-semibold ml-1">4.9/5</span>
                <span className="text-muted-foreground">— +15.000 clientes</span>
              </div>
              <p className="text-muted-foreground italic">"Entrega super rápida e produto excelente!"</p>
            </div>

            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
              {loading ? "A processar..." : `Pagar €${total.toFixed(2)} agora`}
            </Button>

            <div className="space-y-2 mt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success" />O teu pagamento é protegido</div>
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-accent" />Envio rápido após confirmação</div>
              <div className="flex items-center gap-2"><Lock className="h-4 w-4 text-primary" />Encriptação SSL 256-bit</div>
            </div>
          </div>

          <div className="text-center text-[10px] text-muted-foreground">
            ⏳ Oferta termina hoje — stock limitado
          </div>
        </aside>
      </form>
    </SiteLayout>
  );
};

export default Checkout;