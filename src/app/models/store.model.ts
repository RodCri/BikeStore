export interface Category {
  id: string;
  name: string;
}

export interface StoreProduct {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}