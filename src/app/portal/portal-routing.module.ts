import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from '../core/gaurds/guest/guest.guard';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal.component';

const routes: Routes = [
  {
    path: '', component: PortalComponent, children: [
      { path: '', component: HomeComponent, canActivate: [GuestGuard] },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
