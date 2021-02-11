import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './componentes/registro/registro.component';



@NgModule({
  declarations: [LoginComponent, RegistroComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ]),
    ReactiveFormsModule,
    FormsModule
  ],
  //exports: [LoginComponent]
})
export class LoginModule { }
