import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { API } from 'src/app/core/services/constants/constant';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  standalone: false
})
export class PostComponent  implements OnInit {

  @Input() post!: any;

  public inProgress: boolean = false;

  constructor(private http: HttpService, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  likePost(): void {
    if (this.inProgress) {
      return;
    }

    this.inProgress = true;

    this.http.put(API.like.replace('{1}', this.post.id), {}).subscribe({
      next: (response) => {
        this.toastService.showSuccess(
          `Post ${response.likes > this.post.likes ? 'liked' : 'unliked'} successfully!`
        );
        this.post.likes = response.likes;
      },
      error: (err) => {
        console.error('Failed to like post:', err);
        this.toastService.showError('Failed to like post. Please try again.');
      },
      complete: () => {
        this.inProgress = false;
      }
    });
  }
}
