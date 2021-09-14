import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ItosPipe } from '../core/pipes/itos.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ItosPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ItosPipe
  ]
})
export class SharedModule { }
