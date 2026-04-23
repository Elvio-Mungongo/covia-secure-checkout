// Formats prices in Angolan Kwanza (Kz)
export const formatKz = (value: number) =>
  new Intl.NumberFormat("pt-AO", { maximumFractionDigits: 0 }).format(value) + " Kz";

// Generates a short, random-ish order ID for manual reference
export const generateOrderId = () => {
  const ts = Date.now().toString(36).toUpperCase().slice(-4);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `COV-${ts}${rand}`;
};

// WhatsApp number for COVIA payments (Angola)
export const WHATSAPP_NUMBER = "244955397803";

// Builds the wa.me URL with a pre-filled payment confirmation message
export const buildWhatsAppUrl = (opts: {
  orderId: string;
  productSummary: string;
  total: number;
  customerName?: string;
}) => {
  const greeting = opts.customerName
    ? `Olá COVIA, sou ${opts.customerName}.`
    : "Olá COVIA,";
  const message =
    `${greeting}\n\n` +
    `Acabei de efetuar o pagamento da minha encomenda:\n` +
    `• Pedido: ${opts.orderId}\n` +
    `• Produto(s): ${opts.productSummary}\n` +
    `• Valor total: ${formatKz(opts.total)}\n\n` +
    `Estou a enviar o comprovativo de pagamento. Obrigado!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
