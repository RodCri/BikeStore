import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import products from 'src/app/data/products';
import { ProductService } from 'src/app/services/product.service';
import { StoreApiService } from 'src/app/services/store-api.service';
import { StoreProduct } from 'src/app/models/store.model';

@Component({
  selector: 'list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  dataProducts: Product[] = products;
  myShoppingCart: StoreProduct[] = [];

  dataProductsApi: StoreProduct[] = [];
  productDetail: StoreProduct = {
    'id': '0',
    'title': '',
    'price': 0,
    'images': [],
    'description': '',
    'category': {
      'id': '',
      'name': ''
    }
  };

  @Output() total = new EventEmitter<number>();
  @Output() cantidad = new EventEmitter<number>();

  showProductDetail: boolean = false;
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
        this.dataProductsApi = data;
      });
  }

  onAddToShoppingCart(product: StoreProduct) {
    this.productService.addProduct(product)
    this.total.emit(this.productService.getTotal());
    this.cantidad.emit(this.productService.getCount());
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.store.getProduct(id)
      .subscribe(data => {
        this.toggleProductDetail()
        this.productDetail = data;
        console.log(this.productDetail)
      });
  }
}
