import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductComponent } from './components/product/product.component';
import { ImgProductComponent } from './components/img-product/img-product.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListProductsComponent,
    ProductComponent,
    ImgProductComponent,
    DetailProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
