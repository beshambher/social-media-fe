import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { API, Constant } from 'src/app/core/services/constants/constant';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
  standalone: false
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

  followUser(username: string) {
    this.http.put(API.follow.replace('{1}', username), {}).subscribe(() => {
      location.reload();
    });
  }

  loadMore() {
    this.http.getList(API.suggestions + '?page=' + (this.suggestions.number + 1)).subscribe(response => {
      const previousData: [] = this.suggestions.content;
      this.suggestions = response;
      this.suggestions.content = previousData.concat(this.suggestions.content);
    });
  }

}
