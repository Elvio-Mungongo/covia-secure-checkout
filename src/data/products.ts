import proImg from "@/assets/product-pro.jpg";
import miniImg from "@/assets/product-mini.jpg";
import eliteImg from "@/assets/product-elite.jpg";
import flexImg from "@/assets/product-flex.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  stock: number;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    id: "1",
    slug: "covia-pro",
    name: "COVIA Pro",
    tagline: "Performance profissional",
    price: 189,
    oldPrice: 249,
    rating: 4.9,
    reviews: 412,
    image: proImg,
    badge: "Mais Vendido",
    stock: 7,
    description:
      "A massage gun definitiva para atletas e profissionais. Motor brushless silencioso de 65dB com 5 níveis de intensidade e até 3.200 percussões por minuto para uma recuperação muscular profunda e eficaz.",
    features: [
      "Motor brushless silencioso (65dB)",
      "5 velocidades — até 3.200 RPM",
      "Bateria 2.500mAh — 8h de autonomia",
      "6 cabeças intercambiáveis",
      "Display LCD touchscreen",
    ],
    specs: [
      { label: "Potência", value: "60W" },
      { label: "Bateria", value: "2.500 mAh" },
      { label: "Peso", value: "950g" },
      { label: "Garantia", value: "2 anos" },
    ],
  },
  {
    id: "2",
    slug: "covia-mini",
    name: "COVIA Mini",
    tagline: "Compacta e poderosa",
    price: 119,
    oldPrice: 159,
    rating: 4.8,
    reviews: 287,
    image: miniImg,
    badge: "30% OFF",
    stock: 12,
    description:
      "Compacta, leve e silenciosa. A COVIA Mini cabe em qualquer mochila e entrega o poder de uma massage gun premium em formato portátil.",
    features: [
      "Apenas 480g — ultra portátil",
      "4 velocidades de impacto",
      "USB-C — carrega em 2h",
      "4 cabeças incluídas",
      "Estojo de viagem premium",
    ],
    specs: [
      { label: "Potência", value: "40W" },
      { label: "Bateria", value: "1.500 mAh" },
      { label: "Peso", value: "480g" },
      { label: "Garantia", value: "2 anos" },
    ],
  },
  {
    id: "3",
    slug: "covia-elite",
    name: "COVIA Elite",
    tagline: "Para atletas exigentes",
    price: 259,
    oldPrice: 329,
    rating: 5.0,
    reviews: 198,
    image: eliteImg,
    badge: "Premium",
    stock: 4,
    description:
      "A escolha de fisioterapeutas e atletas profissionais. Amplitude de 16mm para alcance muscular profundo e sistema anti-vibração patenteado.",
    features: [
      "Amplitude de 16mm — penetração profunda",
      "7 velocidades inteligentes",
      "Sensor de pressão automático",
      "8 cabeças profissionais",
      "App COVIA com programas guiados",
    ],
    specs: [
      { label: "Potência", value: "90W" },
      { label: "Bateria", value: "3.200 mAh" },
      { label: "Peso", value: "1.1kg" },
      { label: "Garantia", value: "3 anos" },
    ],
  },
  {
    id: "4",
    slug: "covia-flex",
    name: "COVIA Flex",
    tagline: "Design ergonómico premium",
    price: 149,
    oldPrice: 199,
    rating: 4.7,
    reviews: 156,
    image: flexImg,
    badge: "Novo",
    stock: 9,
    description:
      "Pega ergonómica em ângulo, perfeita para alcançar costas e ombros sem esforço. Acabamento premium em rose gold.",
    features: [
      "Pega rotativa 180°",
      "5 velocidades",
      "Bateria 6h de uso",
      "5 cabeças incluídas",
      "Acabamento premium",
    ],
    specs: [
      { label: "Potência", value: "50W" },
      { label: "Bateria", value: "2.000 mAh" },
      { label: "Peso", value: "780g" },
      { label: "Garantia", value: "2 anos" },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);