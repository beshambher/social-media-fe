import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal',
  template: `
    <div class="d-flex align-items-center justify-content-center">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class PortalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
