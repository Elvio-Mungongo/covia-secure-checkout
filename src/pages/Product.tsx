import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Star, ShieldCheck, Truck, RotateCcw, Check, Minus, Plus, Zap } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { getProduct, products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const navigate = useNavigate();

  if (!product) return <Navigate to="/shop" replace />;

  const buyNow = () => {
    add(product, qty);
    navigate("/checkout");
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <SiteLayout>
      <section className="container py-10">
        <p className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-accent">Home</Link> /{" "}
          <Link to="/shop" className="hover:text-accent">Shop</Link> / {product.name}
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary border border-border shadow-card">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[product.image, product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-secondary border border-border">
                  <img src={src} alt="" className="h-full w-full object-cover opacity-80" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            {product.badge && (
              <span className="inline-block bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">{product.name}</h1>
            <p className="text-muted-foreground">{product.tagline}</p>

            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} avaliações)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-bold text-primary">€{product.price}</span>
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">€{product.oldPrice}</span>
              )}
              {product.oldPrice && (
                <span className="bg-success/10 text-success text-xs font-bold px-2 py-1 rounded">
                  Poupa €{product.oldPrice - product.price}
                </span>
              )}
            </div>

            <p className="text-sm leading-relaxed">{product.description}</p>

            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm">
                  <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="bg-destructive/5 border border-destructive/20 rounded-lg px-4 py-3 flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-destructive" />
              <span>
                <strong>Stock limitado:</strong> apenas {product.stock} unidades disponíveis
              </span>
            </div>

            {/* Qty + buttons */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-md">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-12 w-12 grid place-items-center hover:bg-secondary"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="h-12 w-12 grid place-items-center hover:bg-secondary"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button variant="hero" size="xl" className="flex-1" onClick={buyNow}>
                Comprar agora
              </Button>
            </div>
            <Button variant="outline" size="lg" className="w-full" onClick={() => add(product, qty)}>
              Adicionar ao carrinho
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              ⚡ Envio imediato após pagamento confirmado
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
              {[
                { Icon: ShieldCheck, t: "Compra segura" },
                { Icon: Truck, t: "Envio 24-48h" },
                { Icon: RotateCcw, t: "7 dias devolução" },
              ].map(({ Icon, t }) => (
                <div key={t} className="text-center text-xs">
                  <Icon className="h-6 w-6 mx-auto text-accent mb-1" />
                  <div className="text-muted-foreground">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-16 grid md:grid-cols-4 gap-4">
          {product.specs.map((s) => (
            <div key={s.label} className="bg-secondary/50 rounded-xl p-5 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
              <div className="font-display text-2xl font-bold text-primary mt-1">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Related */}
        <div className="mt-20">
          <h2 className="font-display text-3xl font-bold text-primary mb-8">Também podes gostar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Product;