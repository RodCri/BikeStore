import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators'
import { CreateProductDTO, StoreProduct, UpdateproductDTO } from '../models/store.model'

import { environment } from '../../environments/environment'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreApiService {
  private urlApi = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<StoreProduct[]>(this.urlApi, { params })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
        }))
      );
  }

  getProduct(id: string) {
    return this.http.get<StoreProduct>(`${this.urlApi}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            return throwError(() => new Error('Algo fallo en el servidor'));
          }
          return throwError(() => new Error('Upps'));
        })
      )
  }

  create(data: CreateProductDTO) {
    return this.http.post<StoreProduct>(this.urlApi, data);
  }

  update(id: string, dto: UpdateproductDTO) {
    return this.http.put<StoreProduct>(`${this.urlApi}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.urlApi}/${id}`);
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<StoreProduct[]>(`${this.urlApi}`, {
      params: { limit, offset }
    });
  }

}
