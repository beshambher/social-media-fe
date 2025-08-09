import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { API } from 'src/app/core/services/constants/constant';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
  standalone: false
})
export class CommentsComponent implements OnInit {

    @Input() post!: any;
    public user: any;
    public comments: any[] = [];
    public commentForm: FormGroup;

    public inProgress: boolean = false;
    public addingComment: boolean = false;

    constructor(
      private authService: AuthService,
      private http: HttpService,
      private toastService: ToastService
    ) {
      this.commentForm = new FormGroup({
        postId: new FormControl(''),
        comment: new FormControl('', [Validators.required, Validators.maxLength(255)])
      });
    }

    ngOnInit(): void {
      this.user = this.authService.getUser();
    }

    addComment() {
      if (this.addingComment) {
        return;
      }

      this.addingComment = true;

      this.commentForm.patchValue({ postId: this.post.id });
      this.http.post(API.comments, this.commentForm.value).subscribe({
        next: (response) => {
          this.post.commentsCount++;
          this.loadComments();
          this.commentForm.reset();
          this.toastService.showSuccess('Comment added successfully!');
          this.addingComment = false;
        },
        error: (err) => {
          console.error('Failed to add comment on the post:', err);
          this.toastService.showError(`Failed to add comment on the post. ${err.error.message}. Please try again.`);
          this.addingComment = false;
        }
      });
    }

    loadComments(event?: Event): void {
      let isCollapsed = false;
      if (event) {
        const button = event.currentTarget as HTMLElement;
        isCollapsed = button.getAttribute('aria-expanded') === 'false';
      }

      if (this.inProgress || isCollapsed) {
        return;
      }

      this.inProgress = true;

      this.http.get(API.postComments.replace('{1}', this.post.id)).subscribe({
        next: (response) => {
          this.comments = response.content;
          this.inProgress = false;
        },
        error: (err) => {
          console.error('Failed to fetch post comments:', err);
          this.toastService.showError(`Failed to fetch post comments. ${err.message}. Please try again.`);
          this.inProgress = false;
        }
      });
    }

    deleteComment(commentId: string): void {
    }
}
