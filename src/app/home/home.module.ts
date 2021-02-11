import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClienteComponent } from './componentes/cliente/cliente.component';


@NgModule({
  declarations: [HomeComponent, ClienteComponent],
  imports: [
    /*RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      }
    ]),*/
    CommonModule,
    HomeRoutingModule,
    //AppRoutingModule,
  ]
})
export class HomeModule { }
