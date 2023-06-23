import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bikestore';
  total: number = 0;
  cantidad: number = 0;

  onTotal(total: number) {
    this.total = total;
  }
  onCantidad(cantidad: number) {
    this.cantidad = cantidad;
  }
}
