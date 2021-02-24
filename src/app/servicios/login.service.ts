import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioRegistro, LoginResponse } from '../interfaces/interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  public login(usu: string, pass: string): Observable<any>{
    return this.http.post<any>('/micro-usuario/usuario/login',{correo: usu, password: pass});
    /*let resultado: LoginResponse={accesso: true,rol: 'ADMIN'};
    return resultado;*/
  }
  public cerrarSesion(): void{
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('rol');
    sessionStorage.clear();
    console.log(sessionStorage.getItem('id'),sessionStorage.getItem('rol'));
  }
  public registro(datos: FormularioRegistro): Observable<any>{
    return this.http.post<any>('/micro-usuario/usuario/registro',datos);
  }
  public getRoles(): Observable<any>{
    return this.http.get<any>('/micro-usuario/usuario/roles');
  }
}


