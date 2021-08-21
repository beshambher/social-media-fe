import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) { }

  fetchUser() {
    return this.http.get('/social/session/user').subscribe(response => {
      localStorage.setItem('session', JSON.stringify(response));
    }, error => {
      localStorage.removeItem('session');
    });
  }
  
  getUser() {
    return JSON.parse(localStorage.getItem('session')+'');
  }

  get isLoggedIn(): boolean {
    return this.getUser() ? true : false;
  }

  get firstName(): string {
    return this.getUser() ? this.getUser().firstName : '';
  }

  get userName(): string {
    const user = this.getUser();
    return user ? (user.firstName + ' ' + user.lastName) : '';
  }

  get userAvatar(): boolean {
    return this.getUser() ? this.getUser().avatar : '';
  }

  logout() {
    this.http.post('/social/logout', {}).subscribe(response => {
      localStorage.clear();
    });
  }
}
