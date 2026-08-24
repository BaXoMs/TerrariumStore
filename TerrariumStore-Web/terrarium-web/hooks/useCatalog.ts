"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Animal, Product, Category } from "@/lib/types";

export interface CatalogFilters {
  category?: string;
  care_level?: "básico" | "intermedio" | "avanzado";
  in_stock?: boolean;
  search?: string;
}

// Datos mock mientras el backend no está disponible
const MOCK_ANIMALS: Animal[] = [
  {
    id: "1", slug: "pogona-vitticeps", name: "Dragón Barbudo",
    scientific_name: "Pogona vitticeps", category_id: "1",
    description: "El dragón barbudo es uno de los reptiles más populares como mascota. Dócil, activo durante el día y fácil de manejar.",
    care_level: "intermedio", price: 1800, stock: 3,
    image_urls: ["/mock/pogona.jpg"], is_active: true, created_at: new Date().toISOString(),
  },
  {
    id: "2", slug: "eublepharis-macularius", name: "Gecko Leopardo",
    scientific_name: "Eublepharis macularius", category_id: "1",
    description: "Gecko nocturno ideal para principiantes. Robusto, longevo y con una gran variedad de morfas.",
    care_level: "básico", price: 950, stock: 5,
    image_urls: ["/mock/gecko.jpg"], is_active: true, created_at: new Date().toISOString(),
  },
  {
    id: "3", slug: "crested-gecko", name: "Gecko Crestado",
    scientific_name: "Correlophus ciliatus", category_id: "1",
    description: "Arborícola, activo al amanecer y anochecer. No requiere luz UVB intensa.",
    care_level: "básico", price: 780, stock: 0,
    image_urls: ["/mock/crested.jpg"], is_active: true, created_at: new Date().toISOString(),
  },
  {
    id: "4", slug: "blue-tongue-skink", name: "Eslizón Lengua Azul",
    scientific_name: "Tiliqua scincoides", category_id: "1",
    description: "Lagarto robusto y muy dócil. Omnívoro, de fácil alimentación.",
    care_level: "intermedio", price: 2200, stock: 1,
    image_urls: ["/mock/skink.jpg"], is_active: true, created_at: new Date().toISOString(),
  },
];

const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Reptiles", type: "animal", color_accent: "bamboo" },
  { id: "2", name: "Arácnidos", type: "animal", color_accent: "bamboo" },
  { id: "3", name: "Sustratos", type: "product", color_accent: "lime" },
  { id: "4", name: "Iluminación", type: "product", color_accent: "lime" },
  { id: "5", name: "Alimentación", type: "product", color_accent: "lime" },
];

async function fetchAnimals(filters: CatalogFilters): Promise<Animal[]> {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.care_level) params.set("care_level", filters.care_level);
    if (filters.in_stock !== undefined) params.set("in_stock", String(filters.in_stock));
    if (filters.search) params.set("search", filters.search);
    return await api.get<Animal[]>(`/api/v1/catalog/animals?${params}`);
  } catch {
    return MOCK_ANIMALS;
  }
}

async function fetchAnimalBySlug(slug: string): Promise<Animal | null> {
  try {
    return await api.get<Animal>(`/api/v1/catalog/animals/${slug}`);
  } catch {
    return MOCK_ANIMALS.find((a) => a.slug === slug) ?? null;
  }
}

async function fetchCategories(): Promise<Category[]> {
  try {
    return await api.get<Category[]>("/api/v1/catalog/categories");
  } catch {
    return MOCK_CATEGORIES;
  }
}

async function fetchProducts(filters: CatalogFilters): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.in_stock !== undefined) params.set("in_stock", String(filters.in_stock));
    if (filters.search) params.set("search", filters.search);
    return await api.get<Product[]>(`/api/v1/catalog/products?${params}`);
  } catch {
    return [];
  }
}

export function useAnimals(filters: CatalogFilters = {}) {
  return useQuery({
    queryKey: ["catalog", "animals", filters],
    queryFn: () => fetchAnimals(filters),
    staleTime: 2 * 60 * 1000,
  });
}

export function useAnimalBySlug(slug: string) {
  return useQuery({
    queryKey: ["catalog", "animal", slug],
    queryFn: () => fetchAnimalBySlug(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["catalog", "categories"],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
  });
}

export function useProducts(filters: CatalogFilters = {}) {
  return useQuery({
    queryKey: ["catalog", "products", filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 2 * 60 * 1000,
  });
}
