import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/core/services/constants/constant';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false
})
export class ContactComponent implements OnInit {

  public api = API;

  constructor() { }

  ngOnInit(): void {
  }

}
