import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import products from 'src/app/data/products';
import { ProductService } from 'src/app/services/product.service';
import { StoreApiService } from 'src/app/services/store-api.service';
import { CreateProductDTO, StoreProduct, UpdateproductDTO } from 'src/app/models/store.model';

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

  limit = 10;
  offset = 0;

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
    this.store.getAllProducts(10, 0)
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

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo title',
      description: 'nueva description',
      images: [''],
      price: 100,
      categoryId: 2,
    }
    this.store.create(product)
      .subscribe(data => {
        this.dataProductsApi.unshift(data)
      });
  }

  editProduct() {
    const changes: UpdateproductDTO = {
      title: 'cambio titulo'
    }
    const id = this.productDetail.id;
    this.store.update(id, changes)
      .subscribe(data => {
        const productIndex = this.dataProductsApi.findIndex(item => item.id === this.productDetail.id);
        this.dataProductsApi[productIndex] = data;
        this.productDetail = data;
      })
  }

  deleteProduct() {
    const id = this.productDetail.id;
    this.store.delete(id)
      .subscribe(() => {
        const productIndex = this.dataProductsApi.findIndex(item => item.id === this.productDetail.id);
        this.dataProductsApi.splice(productIndex, 1);
        this.showProductDetail = false;
      });
  }

  loadMore() {
    this.store.getProductsByPage(this.limit, this.offset)
      .subscribe(data => {
        this.dataProductsApi = this.dataProductsApi.concat(data);
        this.offset += this.limit;
      });
  }
}
