import { AmazonComponent } from './componentes/amazon/amazon.component';
import { MercadoLibreComponent } from './componentes/mercado-libre/mercado-libre.component';
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
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { AlertsModule } from 'angular-alert-module';
import { ComprarComponent } from './componentes/comprar/comprar.component';
import { VentasComponent } from './componentes/ventas/ventas.component';


@NgModule({
  declarations: [HomeComponent,BuscarComponent,AgregarComponent,CarritoComponent,ComprarComponent,MercadoLibreComponent,AmazonComponent, VentasComponent],
  imports: [
    CommonModule,
    //RouterModule.forChild(routes),
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class HomeModule { }
