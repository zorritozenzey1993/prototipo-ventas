import { LoginService } from './../../../servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { AlertsService } from 'angular-alert-module';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  formulario: FormGroup | any = null;
  roles: any[]= [];
  constructor(
    private enrutador: Router,
    private usuarioService: LoginService,
    private form: FormBuilder,
    private spinner: NgxSpinnerService,
    private alerta: AlertsService
  ) {
    this.formulario = this.form.group({
      nombre: [null, Validators.required],
      apellidoPaterno: [null, Validators.required],
      apellidoMaterno: [null, Validators.required],
      correo: [null, Validators.required],
      contrasenia: [null, Validators.required],
      calle: [null, Validators.required],
      colonia: [null, Validators.required],
      numero: null,
      telefono: [null, Validators.required],
      idRol: [2, Validators.required],
    });
  }

  ngOnInit(): void {
    /* this.spinner.show();
    this.usuarioService.getRoles().pipe(
      finalize(() => {
        this.spinner.hide();
      })
      ).subscribe(
        res => {
          res.forEach((r: { idRol: any; tipoRol: string}) => {
            this.roles.push({
              id: r.idRol,
              desc:r.tipoRol
            });
          });
        }
      ); */
  }
  public regresar(e: any): void {
    console.log(e);
    this.enrutador.navigate(['/', 'login']);
  }
  public registrar(e: FormGroup): void {
    this.spinner.show();
    console.log(e.value);
    this.usuarioService.registro(e.value).pipe(
      finalize(() => {
        this.spinner.hide();
      })
      ).subscribe(
        res=> {
          this.alerta.setMessage(res.mensaje,'success');
          this.enrutador.navigate(['/','login']);
        },
        err =>{
          console.log(err);
        }
      );

  }
}
