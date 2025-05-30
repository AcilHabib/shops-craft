import { db } from "./lib/shopify/types";

export type Article = db & {
    id: string;
    name: string;
    description: string;
    tags: string[];
    quantity: number;
    inStock: boolean;
    type: string;
    isArchived: boolean;
    shop: Shop;
    category: Category;
    collection: Collection;
    options: ArticleOptionType[];
    images: GalleryType[];  
};

type GalleryType = {
  url: string;
  order: number;
  format: GalleryFormat;
};

enum GalleryFormat {
  IMAGE,
  VIDEO
}

type ArticleOptionType = {
  option: string;
  price: number;
  gallery: GalleryType[];
  color?: string;
  quantity: number;
}

export type Staff = db & {
  username: string;
  phone: string;
  email: string;
  password: string;
  type: "GEN" | "ADMIN";
  isActive: boolean;
  role: "ADMIN" | "MANAGER" | "INVENTORY" | "SELLER";
  isArchived?: boolean;
  shop?: Shop;
};

export type Shop = db & {
  name: string;
  isArchived?: boolean;
  articles?: string[]; // Article
  collection?: Collection[];
  categories?: string[]; // Category
  Staff?: Staff[];
  cods?: string[]; // COD
};

export type Category = db & {
  name: string;
  isArchived?: boolean;
  articles?: string[]; // Article
  shop?: Shop;
  gallery?: GalleryType[];
  tags?: string[]; // Tags
};

export type Collection = db & {
  name: string;
  isArchived?: boolean;
  articles?: string[]; // Article
  shop?: Shop;
  gallery?: GalleryType[];
  tags?: string[]; // Tags
};

