import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserResponse } from 'src/app/core/services/auth/user-response.interface';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { API, Constant } from 'src/app/core/services/constants/constant';
import { Post, PaginatedPostsResponse } from '../post/post.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  standalone: false
})
export class FeedComponent implements OnInit {

  public user: UserResponse | any;
  public posts: PaginatedPostsResponse;
  public postForm: FormGroup;

  constructor(private authService: AuthService, private http: HttpService, private toastService: ToastService) {
    this.posts = Constant.defaultPageResponse;
    this.postForm = new FormGroup({
      body: new FormControl('', [Validators.required, Validators.maxLength(4096)])
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getPosts();
  }

  getPosts() {
    this.http.getList<PaginatedPostsResponse>(API.posts).subscribe(response => {
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

  addPost() {
    this.http.post<Post>(API.posts, this.postForm.value).subscribe({
      next: (response) => {
        this.toastService.showSuccess(
        `Post "${this.postForm.value.body.substring(0, 30)}..." has been added successfully!`
        );
        this.getPosts();
        this.postForm.reset();
      },
       error: (err) => {
         console.error('Failed to add post:', err);
         this.toastService.showError(`Failed to add post. ${err.message}. Please try again.`);
       }
    });
  }

  onPostDeleted(deletedPostId: string): void {
    this.posts.content = this.posts.content.filter((p: Post) => p.id !== deletedPostId);
  }
}
