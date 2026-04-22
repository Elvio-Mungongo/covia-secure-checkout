import { Link } from "react-router-dom";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useCart();
  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-secondary">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-1 text-xs">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="font-semibold">{product.rating}</span>
          <span className="text-muted-foreground">({product.reviews})</span>
        </div>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-display text-xl font-semibold text-primary hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">{product.tagline}</p>
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="font-display text-2xl font-bold text-primary">€{product.price}</span>
            {product.oldPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">€{product.oldPrice}</span>
            )}
          </div>
          <Button size="icon" variant="hero" onClick={() => add(product)} aria-label="Adicionar ao carrinho">
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};