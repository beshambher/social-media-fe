import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    PortalComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule
  ]
})
export class PortalModule { }
