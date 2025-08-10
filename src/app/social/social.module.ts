import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialRoutingModule } from './social-routing.module';
import { SocialComponent } from './social.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './middle/feed/feed.component';
import { PostComponent } from './middle/post/post.component';
import { CommentsComponent } from './middle/comments/comments.component';
import { LeftSidebarComponent } from './left/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right/right-sidebar/right-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserPostsComponent } from './profile/user-posts/user-posts.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { UserFriendsComponent } from './profile/user-friends/user-friends.component';


@NgModule({
  declarations: [
    SocialComponent,
    ProfileComponent,
    FeedComponent,
    PostComponent,
    CommentsComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    UserPostsComponent,
    UserFriendsComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    SocialRoutingModule,
    ReactiveFormsModule
  ]
})
export class SocialModule { }
