import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { API, Constant } from 'src/app/core/services/constants/constant';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  standalone: false
})
export class FeedComponent implements OnInit {

  public user: any;
  public posts: any;
  public postForm: FormGroup;

  constructor(private authService: AuthService, private http: HttpService) {
    this.posts = Constant.defaultPageResponse;
    this.postForm = new FormGroup({
      body: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getPosts();
  }

  getPosts() {
    this.http.getList(API.post).subscribe(response => {
      this.posts = response;
    });
  }

  postStatus() {
    this.http.post(API.post, this.postForm.value).subscribe(response => {
      this.getPosts();
      this.postForm.reset();
    });
  }

}
