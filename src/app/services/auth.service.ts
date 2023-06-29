import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { Login } from '../models/user.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlApi = `${environment.API_URL}/api/auth`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<Login>(`${this.urlApi}/login`, { email, password });
  }

  profile() {
    return this.http.get(`${this.urlApi}/profile`);
  }

  getProfile(token: string) {
    // const headers = new HttpHeaders();
    // headers.set('Authorization',  `Bearer ${token}`);
    return this.http.get<Login>(`${this.urlApi}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-type': 'application/json'
      }
    });
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(rta => this.getProfile(rta.access_token)),
      )
  }
}
