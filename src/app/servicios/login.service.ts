import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioRegistro, LoginResponse } from '../interfaces/interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  public login(usu: string, pass: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>('/micro-usuario/usuario/login',{correo: usu, password: pass});
    /*let resultado: LoginResponse={accesso: true,rol: 'ADMIN'};
    return resultado;*/
  }
  public cerrarSesion(): void{
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('rol');
    sessionStorage.clear();
    console.log(sessionStorage.getItem('id'),sessionStorage.getItem('rol'));
  }
  public registro(datos: FormularioRegistro): void{
    /*sessionStorage.removeItem('id');
    sessionStorage.removeItem('rol');
    sessionStorage.clear();
    console.log(sessionStorage.getItem('id'),sessionStorage.getItem('rol'));*/
  }
}


