import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
 import { useProducts } from "@/hooks/useProducts";

 const Shop = () => {
   const { products, loading } = useProducts();
 
   return (
     <SiteLayout>
    <section className="bg-gradient-soft py-16 border-b border-border">
      <div className="container text-center">
        <p className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link> / Shop
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-primary mt-3">
          A coleção <span className="italic text-accent">COVIA</span>
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Massage guns premium para recuperação muscular. Todos os pedidos enviados em 24-48h após pagamento.
        </p>
      </div>
    </section>
    <section className="container py-12">
       <div className="flex items-center justify-between mb-8">
         <p className="text-sm text-muted-foreground">
           {loading ? "A carregar..." : `${products.length} produtos`}
         </p>
        <select className="text-sm border border-border rounded-md px-3 py-2 bg-background">
          <option>Mais vendidos</option>
          <option>Preço: menor → maior</option>
          <option>Preço: maior → menor</option>
          <option>Novidades</option>
        </select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  </SiteLayout>
   );
 };

export default Shop;