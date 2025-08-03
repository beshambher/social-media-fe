import { Injectable } from '@angular/core';
import { API } from '../constants/constant';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) { }

  fetchUser() {
    return this.http.get(API.session).subscribe(response => {
      localStorage.setItem('session', JSON.stringify(response));
    }, error => {
      localStorage.removeItem('session');
    });
  }

  getUser() {
    return JSON.parse(localStorage.getItem('session') + '');
  }

  get isLoggedIn(): boolean {
    return this.getUser() ? true : false;
  }

  get firstName(): string {
    return this.getUser() ? this.getUser().firstName : '';
  }

  get username(): string {
    return this.getUser() ? this.getUser().username : '';
  }

  get fullName(): string {
    const user = this.getUser();
    return user ? (user.firstName + ' ' + user.lastName) : '';
  }

  get userAvatar(): string {
    return this.getUser() ? this.getUser().avatar : '';
  }

  get role(): string {
    return this.getUser() ? this.getUser().role : '';
  }

  get isAdmin(): boolean {
    return this.getUser() ? this.getUser().role == 'ROLE_ADMIN' : false;
  }

  logout() {
    this.http.post(API.logout, {}).subscribe(response => {
      localStorage.clear();
    });
  }
}
