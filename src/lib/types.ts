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

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  productCount: number;
}

export interface AdminProduct extends Product {
  sellerName: string;
  sellerEmail: string;
}
