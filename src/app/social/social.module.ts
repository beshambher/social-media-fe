import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialRoutingModule } from './social-routing.module';
import { SocialComponent } from './social.component';
import { FeedComponent } from './middle/feed/feed.component';
import { PostComponent } from './middle/post/post.component';
import { LeftSidebarComponent } from './left/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right/right-sidebar/right-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SocialComponent,
    FeedComponent,
    PostComponent,
    LeftSidebarComponent,
    RightSidebarComponent
  ],
  imports: [
    CommonModule,
    SocialRoutingModule,
    ReactiveFormsModule
  ]
})
export class SocialModule { }
