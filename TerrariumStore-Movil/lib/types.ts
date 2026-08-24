// Tipos compartidos del catálogo
export interface Category {
  id: string;
  name: string;
  type: "animal" | "product";
  color_accent: "lime" | "bamboo" | "red";
}

export interface Animal {
  id: string;
  slug: string;
  name: string;
  scientific_name: string;
  category_id: string;
  category?: Category;
  description: string;
  care_level: "básico" | "intermedio" | "avanzado";
  price: number;
  stock: number;
  image_urls: string[];
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category_id: string;
  category?: Category;
  description: string;
  price: number;
  stock: number;
  image_urls: string[];
  is_active: boolean;
  created_at: string;
}

export interface ClinicalCase {
  id: string;
  slug: string;
  title: string;
  species: string;
  scientific_name: string;
  summary: string;
  body: string;
  image_urls: string[];
  tags: string[];
  source?: string;
  published_at: string | null;
  created_at: string;
}

export interface Appointment {
  id: string;
  user_id?: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  pet_name: string;
  species: string;
  reason: string;
  scheduled_at: string;
  status: "pendiente" | "confirmada" | "cancelada" | "completada";
  notes?: string;
  created_at: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image_url: string;
  cta_label: string;
  cta_url: string;
  starts_at: string;
  ends_at: string | null;
  is_active: boolean;
}
