import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public social: any[] = [];
  public navigation: any[] = [];

  constructor() {
    this.social = [
      { title: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/beshambher' },
      { title: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/beshambher-chaukhwan' },
      { title: 'Facebook', icon: 'fab fa-facebook', url: 'https://www.facebook.com/beshambher.chaukhwan' }
    ];
    this.navigation = [
      { title: 'Home', icon: 'fab fa-home', url: '/' },
      { title: 'About', icon: 'fab fa-info', url: '#' },
      { title: 'Blog', icon: 'fab fa-rss-square', url: '#' },
      { title: 'Contact', icon: 'fas fa-address-book', url: '#' },
    ];
   }

  ngOnInit(): void {
  }

}
