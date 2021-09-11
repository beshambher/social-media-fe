import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './middle/feed/feed.component';
import { SocialComponent } from './social.component';

const routes: Routes = [
  {
    path: '', component: SocialComponent, children: [
      { path: '', component: FeedComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
