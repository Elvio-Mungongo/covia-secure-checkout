 import { useState, useEffect } from 'react';
 import { products as staticProducts, Product } from '@/data/products';
 
 const STORAGE_KEY = "covia_admin_products";
 
 // Helper to convert slug from name
 const createSlug = (name: string) => name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
 
 export const useProducts = () => {
   const [products, setProducts] = useState<Product[]>([]);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     const loadData = () => {
       try {
         const raw = localStorage.getItem(STORAGE_KEY);
         if (raw) {
           const adminProducts = JSON.parse(raw);
           // Map admin product structure to site Product structure
           const mappedProducts: Product[] = adminProducts.map((p: any) => ({
             id: p.id.toString(),
             slug: createSlug(p.name),
             name: p.name,
             tagline: p.slogan || "",
             price: p.price,
             oldPrice: p.compare_price > 0 ? p.compare_price : undefined,
             rating: 5.0, // Default for new products
             reviews: 0,
             image: p.images && p.images[0] ? p.images[0] : "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
             badge: p.stock <= 0 ? "Esgotado" : (p.compare_price > 0 ? "Oferta" : undefined),
             stock: p.stock,
             description: p.description,
             features: [
               "Qualidade premium COVIA",
               "Garantia de satisfação",
               "Envio rápido"
             ],
             specs: [
               { label: "Stock", value: p.stock.toString() },
               { label: "Garantia", value: "2 anos" }
             ]
           }));
           setProducts(mappedProducts);
         } else {
           // Fallback to static data if local storage is empty
           setProducts(staticProducts);
         }
       } catch (error) {
         console.error("Error loading products from local storage:", error);
         setProducts(staticProducts);
       } finally {
         setLoading(false);
       }
     };
 
     loadData();
 
     // Listen for changes in localStorage from other tabs/windows
     window.addEventListener('storage', loadData);
     return () => window.removeEventListener('storage', loadData);
   }, []);
 
   const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
 
   return { products, loading, getProductBySlug };
 };