import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreProduct } from 'src/app/models/store.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!: StoreProduct;
  @Input() imgParent: string = "";

  @Output() addedProduct = new EventEmitter<StoreProduct>();
  @Output() showProduct = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onLoaded() {
  }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  showDetail() {
    this.showProduct.emit(this.product.id);
  }
}
