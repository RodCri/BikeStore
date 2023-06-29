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
  taxes?: number;
}
// Data Transfer Object
export interface CreateProductDTO extends Omit<StoreProduct, 'id' | 'category'> {
  categoryId: number;
}
// Campos opcionales Partial
export interface UpdateproductDTO extends Partial<CreateProductDTO> {

}