import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { API, Constant } from 'src/app/core/services/constants/constant';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styles: []
})
export class CommentComponent implements OnInit {

  public comments: any;
  public commentForm: FormGroup;
  public commentFormData: any;

  @Input() post: any;
  @Output() success: EventEmitter<any>;

  constructor(private http: HttpService) {
    this.success = new EventEmitter();
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
      cancel: { label: 'Cancel' }
    };
  }

  ngOnInit(): void {
    this.getComments();
    this.commentForm.get('post')?.setValue({ id: this.post?.id });
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
      this.success.emit(true);
    });
  }

  resetCommentForm() {
    this.commentForm.get('comment')?.reset();
  }

}
