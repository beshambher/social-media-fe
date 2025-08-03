import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/core/services/constants/constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: false
})
export class FooterComponent implements OnInit {

  public social: any[] = [];
  public navigation: any[] = [];

  constructor() {
    this.social = Constant.social;
    this.navigation = [
      { title: 'Home', icon: 'fab fa-home', url: '/' },
      { title: 'About', icon: 'fab fa-info', url: '/about' },
      { title: 'Blog', icon: 'fab fa-rss-square', url: '#' },
      { title: 'Contact', icon: 'fas fa-address-book', url: '/contact' },
    ];
  }

  ngOnInit(): void {
  }

}
