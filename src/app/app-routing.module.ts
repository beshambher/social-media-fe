import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/gaurds/auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule) },
  { path: 'my', loadChildren: () => import('./social/social.module').then(m => m.SocialModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
