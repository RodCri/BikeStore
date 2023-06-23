import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import products from 'src/app/data/products';
import { ProductService } from 'src/app/services/product.service';
import { StoreApiService } from 'src/app/services/store-api.service';


@Component({
  selector: 'list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  dataProducts: Product[] = products;
  myShoppingCart: Product[] = [];

  @Output() total = new EventEmitter<number>();
  @Output() cantidad = new EventEmitter<number>();

  // inyeccion de dependecias del servicio creado
  constructor(
    private productService: ProductService,
    private store: StoreApiService
  ) {
    // Cuando no son tareas asincronas
    this.myShoppingCart = this.productService.getMyshoppingCart();
  }

  ngOnInit(): void {
    // cuando son tareas asicronas
    this.store.getAllProducts()
      .subscribe(data => {
        console.log(data)
        // this.dataProducts = data;
      });
  }

  onAddToShoppingCart(product: Product) {
    this.productService.addProduct(product)
    this.total.emit(this.productService.getTotal());
    this.cantidad.emit(this.productService.getCount());
  }

}
