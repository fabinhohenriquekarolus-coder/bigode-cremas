export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function whatsappLinkForProduct(name: string, price: number) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const text = `Olá! Tenho interesse no produto *${name}* (${formatBRL(price)}). Ainda está disponível?`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function whatsappLinkForCart(items: CartItem[]) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const lines = items.map(
    (item) => `• ${item.quantity}x ${item.name} - ${formatBRL(item.price * item.quantity)}`
  );
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const text = [
    "Olá! Quero fazer o seguinte pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatBRL(total)}`,
  ].join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export { formatBRL };
