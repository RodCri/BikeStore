import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import products from 'src/app/data/products';

@Component({
  selector: 'list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  dataProducts: Product[] = products;
  constructor() { }

  ngOnInit(): void {
    console.log(products)
  }

}
