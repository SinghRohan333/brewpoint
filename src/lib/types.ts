export interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: "beans" | "equipment" | "accessories";
  origin?: string;
  roastLevel?: "light" | "medium" | "dark";
  rating: number;
  reviewCount: number;
  images: string[];
  stock: number;
  sellerId: string;
  createdAt: string;
}
