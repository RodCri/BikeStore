import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreProduct } from '../models/store.model'

@Injectable({
  providedIn: 'root'
})
export class StoreApiService {
  private urlApi = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<StoreProduct[]>(this.urlApi);
  }

  getProduct(id: string) {
    return this.http.get<StoreProduct>(`${this.urlApi}/${id}`);
  }

}
