import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-img-product',
  templateUrl: './img-product.component.html',
  styleUrls: ['./img-product.component.scss']
})
export class ImgProductComponent implements OnInit {
  imgDefault: string = "../../../assets/img/default.png";
  @Input() imgProduct: string = "";
  @Output() loaded = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  imgError() {
    this.imgProduct = this.imgDefault;
  }

  imgLoaded() {
    this.loaded.emit();
  }
}
