const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "525500000000";
const BASE_URL = `https://wa.me/${WHATSAPP_PHONE}`;

function encode(text: string) {
  return encodeURIComponent(text.trim());
}

export const whatsapp = {
  /** Consulta por un animal específico */
  animal: (name: string, scientificName?: string) => {
    const msg = scientificName
      ? `Hola, me interesa el animal *${name}* (${scientificName}). ¿Está disponible?`
      : `Hola, me interesa el animal *${name}*. ¿Está disponible?`;
    return `${BASE_URL}?text=${encode(msg)}`;
  },

  /** Consulta por un producto */
  product: (name: string) => {
    const msg = `Hola, me interesa el producto *${name}*. ¿Tienen existencia?`;
    return `${BASE_URL}?text=${encode(msg)}`;
  },

  /** Lista de favoritos */
  favorites: (items: { name: string; type: "animal" | "product" }[]) => {
    const list = items.map((i) => `• ${i.name} (${i.type === "animal" ? "animal" : "producto"})`).join("\n");
    const msg = `Hola, estoy interesado/a en los siguientes:\n${list}\n\n¿Me pueden dar información?`;
    return `${BASE_URL}?text=${encode(msg)}`;
  },

  /** Cita veterinaria */
  appointment: () => {
    const msg = `Hola, me gustaría agendar una cita veterinaria para mi mascota. ¿Cuál es su disponibilidad?`;
    return `${BASE_URL}?text=${encode(msg)}`;
  },

  /** Contacto general */
  general: () => {
    const msg = `Hola, tengo una consulta sobre Terrarium Store.`;
    return `${BASE_URL}?text=${encode(msg)}`;
  },
};
