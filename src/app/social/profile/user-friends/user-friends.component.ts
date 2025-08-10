import { Component, OnInit } from '@angular/core';
import { Constant, API } from 'src/app/core/services/constants/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { PopupService } from 'src/app/core/services/popup/popup.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserResponse, PaginatedUserResponse } from 'src/app/core/services/auth/user-response.interface';

@Component({
  selector: 'app-user-friends',
  standalone: false,
  templateUrl: './user-friends.component.html',
  styleUrl: './user-friends.component.css'
})
export class UserFriendsComponent implements OnInit {

  public friends: PaginatedUserResponse;

  constructor(private http: HttpService, private popupService: PopupService, private toastService: ToastService) {
    this.friends = Constant.defaultPageResponse;
  }

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends() {
    this.http.getList<PaginatedUserResponse>(API.friends).subscribe(response => {
      this.friends = response;
    });
  }

  loadMoreFriends() {
    this.http.getList<PaginatedUserResponse>(API.friends, {page: (this.friends.number + 1)}).subscribe(response => {
      const previousData: UserResponse[] = this.friends.content;
      this.friends = response;
      this.friends.content = previousData.concat(this.friends.content);
    });
  }

  confirmUnfollowUser(username: string): void {
    this.popupService.open({
      title: 'Confirm Unfollow',
      type: 'error',
      message: `Are you sure you want to unfollow the user "${username}"? You can follow then again.`,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(confirmed => {
      if (confirmed) {
        this.unfollowUser(username);
      } else {
        this.toastService.showInfo('User unfollow cancelled.');
      }
    });
  }

  unfollowUser(username: string) {
    this.http.put<UserResponse>(API.unfollow.replace('{1}', username), {}).subscribe({
      next: (response) => {
        this.toastService.showSuccess(`User "${username}" has been unfollowed successfully!`);
        this.friends.content = this.friends.content.filter((u: UserResponse) => u.username !== username);
      },
      error: (err) => {
        console.error('Failed to unfollow user:', err);
        this.toastService.showError(`Failed to unfollow the user. ${err.message}. Please try again.`);
      }
   });
 }
}
