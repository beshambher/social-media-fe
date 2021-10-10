import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { API, Constant } from 'src/app/core/services/constants/constant';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styles: [`
    .mw-unset {
      min-width: auto;
    }
  `]
})
export class CommentComponent implements OnInit {

  public user: any;
  public comments: any;
  public commentId: string;
  public commentForm: FormGroup;
  public commentFormData: any;
  public editCommentId: string;
  public editCommentForm: FormGroup;
  public editCommentFormData: any;

  @Input() post: any;
  @Output() success: EventEmitter<number>;

  constructor(private authService: AuthService, private http: HttpService) {
    this.commentId = '';
    this.editCommentId = '';
    this.success = new EventEmitter();
    this.user = this.authService.getUser();
    this.comments = Constant.defaultPageResponse;
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required),
      post: new FormControl({ id: this.post?.id })
    });
    this.commentFormData = {
      formControls: [
        { name: 'comment', id: 'addcommentarea', label: 'Add comment', placeholder: 'What are your views on this?' }
      ],
      save: { label: 'Add' },
      cancel: { label: 'Clear' }
    };
    this.editCommentForm = new FormGroup({
      comment: new FormControl('', Validators.required),
      post: new FormControl({ id: this.post?.id })
    });
    this.editCommentFormData = {
      formControls: [
        { name: 'comment', id: 'editcommentarea', label: 'Edit comment', placeholder: 'You can\'t leave it empty!' }
      ],
      save: { label: 'Update' },
      cancel: { label: 'Cancel' }
    };
  }

  ngOnInit(): void {
    this.getComments();
    this.commentForm.get('post')?.setValue({ id: this.post.id });
    this.editCommentForm.get('post')?.setValue({ id: this.post.id });
  }

  getComments() {
    this.http.getList(API.postComments.replace('{id}', this.post.id)).subscribe(response => {
      this.comments = response;
    });
  }

  loadMore() {
    this.http.getList(API.postComments.replace('{id}', this.post.id) + '?page=' + (this.comments.number + 1)).subscribe(response => {
      const previousData: [] = this.comments.content;
      this.comments = response;
      this.comments.content = previousData.concat(this.comments.content);
    });
  }

  postComment($event: any) {
    if (!$event) return;
    this.http.post(API.comments, $event).subscribe(response => {
      this.getComments();
      this.resetCommentForm();
      this.success.emit(1);
    });
  }

  resetCommentForm() {
    this.commentForm.get('comment')?.reset();
  }

  editComment(comment: any) {
    this.editCommentId = comment.id;
    this.editCommentForm.get('comment')?.setValue(comment.comment);
  }

  editPostComment($event: any, id: string) {
    if (!$event) return;
    this.http.put(API.commentId.replace('{id}', id), $event).subscribe(response => {
      this.comments.content.find((p: any) => p.id == id).comment = $event.comment;
      this.editCommentForm.get('comment')?.reset();
    });
    this.editCommentId = '';
  }

  deleteComment($event: any) {
    this.commentId = $event.relatedTarget.getAttribute('data-bs-id');
  }

  deletePostComment() {
    const id = this.commentId;
    this.http.delete(API.commentId.replace('{id}', id)).subscribe(response => {
      const index = this.comments.content.findIndex((p: any) => p.id == id);
      this.comments.content.splice(index, 1);
      this.comments.content = this.comments.content;
      this.success.emit(-1);
    });
    this.commentId = '';
  }

}
