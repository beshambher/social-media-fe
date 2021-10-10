import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { API, Constant } from 'src/app/core/services/constants/constant';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public user: any;
  public posts: any;

  public editPostId: string;
  public deletePostId: string;

  public postForm: FormGroup;
  public editPostForm: FormGroup;
  public editPostFormData: any;

  constructor(private authService: AuthService, private http: HttpService) {
    this.posts = Constant.defaultPageResponse;
    this.postForm = new FormGroup({
      body: new FormControl('', Validators.required)
    });
    this.editPostId = '';
    this.deletePostId = '';
    this.editPostForm = new FormGroup({
      body: new FormControl('', Validators.required)
    });
    this.editPostFormData = Constant.defaultTextAreaData;
    this.editPostFormData.formControls = [
      { name: 'body', id: 'editpostarea', label: 'Edit post', placeholder: 'You can\'t leave it empty!' }
    ];
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getPosts();
  }

  get smallScreen(): boolean {
    return window.screen.width <= 576;
  }

  getPosts() {
    this.http.getList(API.posts).subscribe(response => {
      this.posts = response;
    });
  }

  loadMore() {
    this.http.getList(API.posts + '?page=' + (this.posts.number + 1)).subscribe(response => {
      const previousData: [] = this.posts.content;
      this.posts = response;
      this.posts.content = previousData.concat(this.posts.content);
    });
  }

  postStatus() {
    this.http.post(API.posts, this.postForm.value).subscribe(response => {
      this.getPosts();
      this.postForm.reset();
    });
  }

  editPost(post: any) {
    this.editPostId = post.id;
    this.editPostForm.get('body')?.setValue(post.body);
  }

  editPostStatus($event: any, id: string) {
    if (!$event) return;
    this.http.put(API.postId.replace('{id}', id), $event).subscribe(response => {
      this.posts.content.find((p: any) => p.id == id).body = $event.body;
      this.editPostForm.reset();
    });
    this.editPostId = '';
  }

  deletePost($event: any) {
    this.deletePostId = $event.relatedTarget.getAttribute('data-bs-id');
  }

  deletePostStatus() {
    const id = this.deletePostId;
    this.http.delete(API.postId.replace('{id}', id)).subscribe(response => {
      const index = this.posts.content.findIndex((p: any) => p.id == id);
      this.posts.content.splice(index, 1);
      this.posts.content = this.posts.content;
    });
    this.deletePostId = '';
  }

  togglePostLike(id: string) {
    this.http.put(API.postLike.replace('{id}', id), this.editPostForm.value).subscribe(response => {
      const index = this.posts.content.findIndex((p: any) => p.id == id);
      this.posts.content[index] = response;
    });
  }

}
