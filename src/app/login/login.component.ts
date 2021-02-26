import { LoginService } from '../servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario:FormGroup | any =null;
  constructor(
    private enrutador: Router,
    private form: FormBuilder,
    private loginService: LoginService,
    private alertas: MessageService
    ) {
    if(sessionStorage.getItem('id') !== null){
      console.log(sessionStorage.getItem('id'));
      this.enrutador.navigate(['/','home'])

    }
    this.formulario=this.form.group({
      correo:[null,Validators.required],
      password: [null,Validators.required]
    });
  }

  ngOnInit(): void {

  }
  public login(val: any): void{
    console.log(val);
    this.loginService.login(val.correo,val.password).subscribe(res => {
      if(res.accesso){
        sessionStorage.setItem('id',res.id);
        sessionStorage.setItem('correo',val.correo);
        sessionStorage.setItem('rol',res.rol);
        this.enrutador.navigate(['/','home'])
      }else{
        this.alertas.add({severity: 'error',detail:'Acceso no autorizado'});
      }
    },err=>{
      console.log(err);
      this.alertas.add({severity: 'error',detail:'Error'});
    });

  }
}
