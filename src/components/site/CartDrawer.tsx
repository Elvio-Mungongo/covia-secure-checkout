import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { formatKz } from "@/lib/format";

export const CartDrawer = () => {
  const { items, open, setOpen, setQty, remove, subtotal } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-background">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="font-display text-xl text-primary">O teu carrinho</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-4">
            <div className="text-6xl">🛒</div>
            <p className="text-muted-foreground">O teu carrinho está vazio.</p>
            <Button asChild variant="hero" onClick={() => setOpen(false)}>
              <Link to="/shop">Ver produtos</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((it) => (
                <div key={it.product.id} className="flex gap-3 pb-4 border-b border-border">
                  <img
                    src={it.product.image}
                    alt={it.product.name}
                    className="h-20 w-20 rounded-lg object-cover bg-secondary"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{it.product.name}</div>
                    <div className="text-accent font-display text-base font-bold">{formatKz(it.product.price)}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => setQty(it.product.id, it.quantity - 1)}
                        className="h-7 w-7 rounded border border-border grid place-items-center hover:bg-secondary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{it.quantity}</span>
                      <button
                        onClick={() => setQty(it.product.id, it.quantity + 1)}
                        className="h-7 w-7 rounded border border-border grid place-items-center hover:bg-secondary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => remove(it.product.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border bg-secondary/40 p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-success" />
                Pagamento 100% seguro — sem pagamento na entrega
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl font-bold text-primary">{formatKz(subtotal)}</span>
              </div>
              <Button asChild variant="hero" size="lg" className="w-full" onClick={() => setOpen(false)}>
                <Link to="/checkout">Pagar via WhatsApp →</Link>
              </Button>
              <p className="text-[10px] text-center text-muted-foreground">
                Pedido confirmado apenas após envio do comprovativo de pagamento.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};