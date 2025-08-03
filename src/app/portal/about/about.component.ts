import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/core/services/constants/constant';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false
})
export class AboutComponent implements OnInit {

  public social: any[] = [];

  constructor() {
    this.social = Constant.social;
  }

  ngOnInit(): void {
  }

}
