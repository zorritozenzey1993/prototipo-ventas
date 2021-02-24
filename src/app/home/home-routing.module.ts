import { MercadoLibreComponent } from './componentes/mercado-libre/mercado-libre.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './componentes/agregar/agregar.component';
import { BuscarComponent } from './componentes/buscar/buscar.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { AmazonComponent } from './componentes/amazon/amazon.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'agregar',
        component: AgregarComponent
      },
      {
        path: 'buscar',
        component: BuscarComponent
      },
      {
        path: 'carrito',
        component: CarritoComponent
      },
      {
        path: 'comprar',
        component: VentasComponent
      },
      {
        path: 'mercado-libre',
        component: MercadoLibreComponent
      },
      {
        path: 'amazon',
        component: AmazonComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
