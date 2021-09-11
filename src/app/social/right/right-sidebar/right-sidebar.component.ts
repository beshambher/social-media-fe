import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { API, Constant } from 'src/app/core/services/constants/constant';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {

  public suggestions: any;

  constructor(private authService: AuthService, private http: HttpService) { }

  ngOnInit(): void {
    this.suggestions = Constant.defaultPageResponse;
    this.getFriends();
  }

  getFriends() {
    this.http.getList(API.suggestions).subscribe(response => {
      this.suggestions = response;
    });
  }

}
