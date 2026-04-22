import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shipping", label: "Envio & Pagamento" },
  { to: "/about", label: "Sobre" },
];

export const Header = () => {
  const { count, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="container flex h-9 items-center justify-between">
          <span className="hidden md:block">📞 Apoio: +351 800 123 456</span>
          <span className="text-center flex-1 md:flex-none">
            ✨ Subscreve e ganha <strong>20% OFF</strong> na 1ª compra —{" "}
            <Link to="/shop" className="underline text-accent-glow">
              Subscreve agora
            </Link>
          </span>
          <div className="hidden md:flex gap-3 opacity-80">
            <span>Instagram</span>
            <span>TikTok</span>
            <span>YouTube</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-bold">
              C
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-primary">
              COVIA<span className="text-accent">.</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  pathname === n.to ? "text-accent" : "text-foreground"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Procurar">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Favoritos" className="hidden md:inline-flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Conta" className="hidden md:inline-flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Carrinho" onClick={() => setOpen(true)} className="relative">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold grid place-items-center">
                  {count}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobile((v) => !v)}
              aria-label="Menu"
            >
              {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobile && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="container flex flex-col py-4 gap-3">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobile(false)}
                  className="text-sm font-medium py-2 border-b border-border last:border-0"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};