import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule) },
  { path: 'social', loadChildren: () => import('./social/social.module').then(m => m.SocialModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
