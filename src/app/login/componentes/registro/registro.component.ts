import { LoginService } from './../../../servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  formulario: FormGroup | any = null;
  constructor(
    private enrutador: Router,
    private loginService: LoginService,
    private form: FormBuilder
  ) {
    this.formulario = this.form.group({
      nombre: [null, Validators.required],
      apPat: [null, Validators.required],
      apMat: [null, Validators.required],
      correo: [null, Validators.required],
      password: [null, Validators.required],
      calle: [null, Validators.required],
      colonia: [null, Validators.required],
      numero: null,
      telefono: [null, Validators.required],
    });
  }

  ngOnInit(): void {}
  public regresar(e: any): void {
    console.log(e);
    this.enrutador.navigate(['/', 'login']);
  }
  public registrar(e: FormGroup): void {
    console.log(e.value);
    this.loginService.registro(e.value);
    this.enrutador.navigate(['/','login']);
  }
}
