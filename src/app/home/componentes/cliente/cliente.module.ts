import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { BuscarComponent } from './buscar/buscar.component';
import { CarritoComponent } from './carrito/carrito.component';


@NgModule({
  declarations: [BuscarComponent, CarritoComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
