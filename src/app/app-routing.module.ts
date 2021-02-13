import { RegistroComponent } from './login/componentes/registro/registro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./login/componentes/registro/registro.module').then((m) => m.RegistroModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
