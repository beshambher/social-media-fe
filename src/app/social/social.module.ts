import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialRoutingModule } from './social-routing.module';
import { SocialComponent } from './social.component';
import { FeedComponent } from './middle/feed/feed.component';
import { LeftSidebarComponent } from './left/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right/right-sidebar/right-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DeleteModalComponent } from './middle/partials/delete-modal/delete-modal.component';


@NgModule({
  declarations: [
    SocialComponent,
    FeedComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SocialRoutingModule,
    ReactiveFormsModule
  ]
})
export class SocialModule { }
