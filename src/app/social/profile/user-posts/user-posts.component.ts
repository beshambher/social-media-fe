import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { API, Constant } from 'src/app/core/services/constants/constant';
import { Post, PaginatedPostsResponse } from 'src/app/social/middle/post/post.interface';

@Component({
  selector: 'app-user-posts',
  standalone: false,
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent {

  public posts: PaginatedPostsResponse;

  constructor(private http: HttpService, private toastService: ToastService) {
    this.posts = Constant.defaultPageResponse;
  }

  ngOnInit(): void {
    this.getUserPosts();
  }

  getUserPosts() {
    this.http.getList<PaginatedPostsResponse>(API.userPosts).subscribe(response => {
      this.posts = response;
    });
  }

  loadMorePosts() {
    this.http.getList<PaginatedPostsResponse>(API.userPosts, {page: (this.posts.number + 1)}).subscribe(response => {
      const previousData: Post[] = this.posts.content;
      this.posts = response;
      this.posts.content = previousData.concat(this.posts.content);
    });
  }

  onPostDeleted(deletedPostId: string): void {
    this.posts.content = this.posts.content.filter((p: Post) => p.id !== deletedPostId);
  }
}
