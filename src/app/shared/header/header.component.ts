import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { API } from 'src/app/core/services/constants/constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent implements OnInit {

  public navigation: any[] = [];
  public api = API;

  constructor(public authService: AuthService) {
    this.navigation = [
      { title: 'Home', icon: 'fab fa-home', url: '/' },
      { title: 'About', icon: 'fab fa-info', url: '/about' },
      { title: 'Blog', icon: 'fab fa-rss-square', url: '' },
      { title: 'Contact', icon: 'fas fa-address-book', url: '/contact' },
    ];
  }

  ngOnInit(): void {
  }
}
