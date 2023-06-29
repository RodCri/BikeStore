import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

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

  constructor(
    private auth: AuthService,
    private user: UsersService
  ) {

  }

  createUser() {
    this.user.create({
      name: 'camilo',
      email: 'camilo@k.com',
      password: '121212'
    })
      .subscribe(rta => {
        console.log(rta);
      })
  }

  login() {
    this.auth.login('camilo@k.com', '121212')
      .subscribe(rta => {
        console.log(rta.access_token);
      })
  }
}
