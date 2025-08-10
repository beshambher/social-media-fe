import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Constant, API } from 'src/app/core/services/constants/constant';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
  standalone: false
})
export class LeftSidebarComponent implements OnInit {

  public user: any;
  public friends: any;

  constructor(private authService: AuthService, private http: HttpService) { }

  ngOnInit(): void {
    this.friends = Constant.defaultPageResponse;
    this.user = this.authService.getUser();
    this.getFriends();
  }

  getFriends() {
    this.http.getList(API.friends).subscribe(response => {
      this.friends = response;
    });
  }

  unfollowUser(username: string) {
    this.http.put(API.unfollow.replace('{1}', username), {}).subscribe(() => {
      location.reload();
    });
  }

  loadMore() {
    this.http.getList(API.friends, {page: (this.friends.number + 1)}).subscribe(response => {
      const previousData: [] = this.friends.content;
      this.friends = response;
      this.friends.content = previousData.concat(this.friends.content);
    });
  }

}
