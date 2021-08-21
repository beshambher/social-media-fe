import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class SocialComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
