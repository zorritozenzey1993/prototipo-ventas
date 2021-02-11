import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./componentes/admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./componentes/cliente/cliente.module').then(m => m.ClienteModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
