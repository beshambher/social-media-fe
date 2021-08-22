import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class PortalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
