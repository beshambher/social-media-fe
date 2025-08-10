import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './middle/feed/feed.component';
import { SocialComponent } from './social.component';
import { ProfileComponent } from './profile/profile.component';
import { UserPostsComponent } from './profile/user-posts/user-posts.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { UserFriendsComponent } from './profile/user-friends/user-friends.component';

const routes: Routes = [
  {
    path: '', component: SocialComponent, children: [
      { path: '', component: FeedComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: '', component: UserProfileComponent },
          { path: 'posts', component: UserPostsComponent },
          { path: 'friends', component: UserFriendsComponent }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
