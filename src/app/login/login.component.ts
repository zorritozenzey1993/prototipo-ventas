import { LoginService } from '../servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    ) {
    if(sessionStorage.getItem('id') !== null){
      console.log(sessionStorage.getItem('id'));
      this.enrutador.navigate(['/home'])

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
    let res=this.loginService.login(val.correo,val.password);
    if(res.accesso){
      sessionStorage.setItem('id',val.correo);
      sessionStorage.setItem('rol',res.rol);
      this.enrutador.navigate(['/home'],{queryParams:{usuario: val.correo}})
    }
  }
}
