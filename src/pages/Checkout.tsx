import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Truck,
  Star,
  Copy,
  Check,
  MessageCircle,
  Building2,
  Smartphone,
  Loader2,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { buildWhatsAppUrl, formatKz, generateOrderId, WHATSAPP_NUMBER } from "@/lib/format";

// --- Manual payment references shown to the customer ---
const PAYMENT_METHODS = [
  {
    id: "transfer",
    Icon: Building2,
    label: "Transferência bancária",
    fields: [
      { k: "Banco", v: "BAI — Banco Angolano de Investimentos" },
      { k: "Titular", v: "COVIA Angola, Lda." },
      { k: "IBAN", v: "AO06 0040 0000 1234 5678 9012 3" },
    ],
  },
  {
    id: "multicaixa",
    Icon: Smartphone,
    label: "Multicaixa Express",
    fields: [
      { k: "Número", v: "+244 955 397 803" },
      { k: "Titular", v: "COVIA Angola" },
      { k: "Referência", v: "Usa o teu nº de pedido" },
    ],
  },
];

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  // Stable per-visit order id (regenerates only after a successful send + clear)
  const [orderId] = useState(() => generateOrderId());
  const [customerName, setCustomerName] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const productSummary = useMemo(
    () => items.map((it) => `${it.quantity}x ${it.product.name}`).join(", "),
    [items]
  );

  // --- Empty cart guard ---
  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="container py-24 text-center space-y-6 animate-fade-up">
          <h1 className="font-display text-4xl font-bold text-primary">Carrinho vazio</h1>
          <p className="text-muted-foreground">
            Adiciona produtos antes de finalizar a compra.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/shop">Ver produtos</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  // --- Copy-to-clipboard helper for IBAN, phone, order ID, etc. ---
  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      toast.success("Copiado!");
      setTimeout(() => setCopied(null), 1500);
    } catch {
      toast.error("Não foi possível copiar");
    }
  };

  // --- Open WhatsApp with the pre-filled message ---
  const sendProof = () => {
    setSending(true);
    const url = buildWhatsAppUrl({
      orderId,
      productSummary,
      total: subtotal,
      customerName: customerName.trim() || undefined,
    });
    // Small delay so the loading state is visible (premium feel)
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setSending(false);
      toast.success("WhatsApp aberto — envia o comprovativo!");
    }, 600);
  };

  return (
    <SiteLayout>
      {/* Hero / page title */}
      <section className="bg-gradient-soft py-10 border-b border-border animate-fade-up">
        <div className="container">
          <h1 className="font-display text-4xl font-bold text-primary">
            Finalizar pedido
          </h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-success">
            <Lock className="h-4 w-4" />
            <span>Pagamento manual — confirmação rápida via WhatsApp</span>
          </div>
        </div>
      </section>

      <div className="container py-10 grid lg:grid-cols-[1fr_400px] gap-10">
        {/* ============ LEFT: payment instructions ============ */}
        <div className="space-y-8">
          {/* Order reference */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card animate-fade-up">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-primary">
                  Nº do pedido
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Usa esta referência ao fazer o pagamento
                </p>
              </div>
              <button
                onClick={() => copy(orderId, "order")}
                className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-lg px-4 py-2 hover:bg-accent/20 transition-colors"
              >
                <span className="font-mono text-lg font-bold text-primary tracking-wider">
                  {orderId}
                </span>
                {copied === "order" ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4 text-accent" />
                )}
              </button>
            </div>
          </div>

          {/* Customer name (optional but personalizes WhatsApp message) */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card animate-fade-up">
            <h2 className="font-display text-xl font-bold text-primary mb-4">
              1. O teu nome
            </h2>
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Como te identificas no WhatsApp"
              />
            </div>
          </div>

          {/* Payment instructions */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card animate-fade-up">
            <h2 className="font-display text-xl font-bold text-primary mb-1">
              2. Efetua o pagamento
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Escolhe uma das opções abaixo e usa o nº de pedido como referência.
            </p>

            <div className="space-y-4">
              {PAYMENT_METHODS.map(({ id, Icon, label, fields }) => (
                <div
                  key={id}
                  className="rounded-xl border border-border p-5 hover:border-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 grid place-items-center">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="font-semibold">{label}</div>
                  </div>
                  <dl className="space-y-2 text-sm">
                    {fields.map((f) => (
                      <div
                        key={f.k}
                        className="flex items-center justify-between gap-3 py-2 border-b border-border/50 last:border-0"
                      >
                        <dt className="text-muted-foreground text-xs uppercase tracking-wider">
                          {f.k}
                        </dt>
                        <dd className="flex items-center gap-2 font-mono text-sm text-right">
                          <span className="truncate">{f.v}</span>
                          <button
                            onClick={() => copy(f.v, `${id}-${f.k}`)}
                            className="text-muted-foreground hover:text-accent shrink-0"
                            aria-label={`Copiar ${f.k}`}
                          >
                            {copied === `${id}-${f.k}` ? (
                              <Check className="h-4 w-4 text-success" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 mt-6 text-sm flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <span>
                <strong>Importante:</strong> o teu pedido só é processado depois de
                recebermos o comprovativo de pagamento via WhatsApp.
              </span>
            </div>
          </div>

          {/* Send proof CTA card */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-elegant animate-fade-up">
            <h2 className="font-display text-2xl font-bold mb-2">
              3. Envia o comprovativo
            </h2>
            <p className="text-sm opacity-80 mb-5">
              Clica no botão abaixo para abrir o WhatsApp com a tua mensagem já
              preparada — só precisas de anexar o comprovativo.
            </p>
            <Button
              onClick={sendProof}
              variant="hero"
              size="xl"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-0"
              disabled={sending}
            >
              {sending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />A abrir WhatsApp...
                </>
              ) : (
                <>
                  <MessageCircle className="h-5 w-5" />
                  Já paguei — Enviar comprovativo
                </>
              )}
            </Button>
            <p className="text-[11px] opacity-70 text-center mt-3">
              Vais ser redirecionado para o WhatsApp ({WHATSAPP_NUMBER.replace(
                /(\d{3})(\d{3})(\d{3})(\d{3})/,
                "+$1 $2 $3 $4"
              )})
            </p>
          </div>
        </div>

        {/* ============ RIGHT: order summary ============ */}
        <aside className="lg:sticky lg:top-32 self-start space-y-4 animate-fade-up">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-elegant">
            <h3 className="font-display text-lg font-bold text-primary mb-4">
              Resumo do pedido
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((it) => (
                <div key={it.product.id} className="flex gap-3">
                  <div className="relative">
                    <img
                      src={it.product.image}
                      alt=""
                      className="h-16 w-16 rounded-lg object-cover bg-secondary"
                    />
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center">
                      {it.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-sm min-w-0">
                    <div className="font-semibold truncate">{it.product.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {formatKz(it.product.price)} × {it.quantity}
                    </div>
                  </div>
                  <div className="font-semibold text-sm whitespace-nowrap">
                    {formatKz(it.product.price * it.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatKz(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envio</span>
                <span className="text-success font-semibold">
                  Combinado por WhatsApp
                </span>
              </div>
              <div className="flex justify-between font-display text-xl font-bold text-primary pt-2 border-t border-border">
                <span>Total</span>
                <span>{formatKz(subtotal)}</span>
              </div>
            </div>

            {/* Reviews near button */}
            <div className="bg-secondary/50 rounded-lg p-3 my-4 text-xs">
              <div className="flex items-center gap-1 mb-1 flex-wrap">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                ))}
                <span className="font-semibold ml-1">4.9/5</span>
                <span className="text-muted-foreground">— +15.000 clientes</span>
              </div>
              <p className="text-muted-foreground italic">
                "Entrega super rápida e produto excelente!"
              </p>
            </div>

            <Button
              onClick={sendProof}
              variant="hero"
              size="lg"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-0"
              disabled={sending}
            >
              <MessageCircle className="h-4 w-4" />
              Pagar via WhatsApp
            </Button>

            <div className="space-y-2 mt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success" />
                Confirmação manual rápida
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-accent" />
                Envio após validação do pagamento
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                Sem partilha de dados de cartão
              </div>
            </div>

            <button
              onClick={() => {
                clear();
                toast.message("Carrinho limpo");
              }}
              className="w-full text-xs text-muted-foreground hover:text-destructive mt-4"
            >
              Cancelar e esvaziar carrinho
            </button>
          </div>

          <div className="text-center text-[10px] text-muted-foreground">
            ⏳ Oferta termina hoje — stock limitado
          </div>
        </aside>
      </div>
    </SiteLayout>
  );
};

export default Checkout;
