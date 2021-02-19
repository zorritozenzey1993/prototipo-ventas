import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule} from './home-routing.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscarComponent } from './componentes/buscar/buscar.component';
import { AgregarComponent } from './componentes/agregar/agregar.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [HomeComponent,BuscarComponent,AgregarComponent],
  imports: [
    CommonModule,
    //BrowserModule,
    //RouterModule.forChild(routes),
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class HomeModule { }
