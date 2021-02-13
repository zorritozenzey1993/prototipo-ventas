import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas/ventas.component';
import { AgregarComponent } from './agregar/agregar.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AgregarComponent, VentasComponent, AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
    /*RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,

      },
    ]),*/
  ],
  exports:[AgregarComponent, VentasComponent, AdminComponent]
})
export class AdminModule {}
