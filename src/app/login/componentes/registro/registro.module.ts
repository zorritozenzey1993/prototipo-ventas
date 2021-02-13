import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegistroComponent
      }
    ]),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegistroModule { }
