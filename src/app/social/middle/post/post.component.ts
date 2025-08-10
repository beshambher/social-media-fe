import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { PopupService } from 'src/app/core/services/popup/popup.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { API } from 'src/app/core/services/constants/constant';
import { Post } from './post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  standalone: false
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  @Output() postDeleted = new EventEmitter<string>();

  public user: any;
  public inProgress: boolean = false;

  constructor(
    private authService: AuthService,
    private http: HttpService,
    private popupService: PopupService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  likePost(): void {
    if (this.inProgress) {
      return;
    }

    this.inProgress = true;

    this.http.put<Post>(API.like.replace('{1}', this.post.id), {}).subscribe({
      next: (response) => {
        this.toastService.showSuccess(
          `Post ${response.likes > this.post.likes ? 'liked' : 'unliked'} successfully!`
        );
        this.post.likes = response.likes;
        this.inProgress = false;
      },
      error: (err) => {
        console.error('Failed to like post:', err);
        this.toastService.showError(`Failed to like post. ${err.message}. Please try again.`);
        this.inProgress = false;
      }
    });
  }

  confirmDeletePost(): void {
    this.popupService.open({
      title: 'Confirm Deletion',
      type: 'error',
      message: `Are you sure you want to delete the post "${this.post.body.substring(0, 30)}..."?
      All the comments will be deleted as well. This action cannot be undone.`,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'No, Keep It'
    }).then(confirmed => {
      if (confirmed) {
        this.deletePost();
      } else {
        this.toastService.showInfo('Post deletion cancelled.');
      }
    });
  }

  deletePost(): void {
    this.http.delete<Post>(API.post.replace('{1}', this.post.id)).subscribe({
      next: (response) => {
        this.toastService.showSuccess(`Post "${this.post.body.substring(0, 30)}..." has been deleted successfully!`);
        this.postDeleted.emit(this.post.id);
      },
      error: (err) => {
        console.error('Failed to delete post:', err);
        this.toastService.showError(`Failed to delete post. ${err.message}. Please try again.`);
      }
    });
  }
}
