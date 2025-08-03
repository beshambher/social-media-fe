import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  template: `
    <div class="px-3 py-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
  standalone: false
})
export class SocialComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
