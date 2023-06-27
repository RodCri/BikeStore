import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { StoreProduct } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myShoppingCart: StoreProduct[] = [];

  constructor() { }

  getMyshoppingCart() {
    return this.myShoppingCart;
  }

  addProduct(product: StoreProduct) {
    this.myShoppingCart.push(product);
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  getCount() {
    return this.myShoppingCart.length;
  }
}
