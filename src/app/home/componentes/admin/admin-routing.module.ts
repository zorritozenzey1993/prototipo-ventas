import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './ventas/ventas.component';
import { AgregarComponent } from './agregar/agregar.component';

const routes: Routes = [
  {
      path: '',
      component: AdminComponent,
      children: [
        {
          path: 'agregar',
          component: VentasComponent,
        },
        {
          path: 'ventas',
          component: AgregarComponent,
        },
      ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
