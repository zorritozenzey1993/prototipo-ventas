import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  public login(usu: string, pass: string): any{
    //return this.http.post('http://localhost:9000/login',{correo: usu, password: pass});
    let resultado: Datos={accesso: true,rol: 'ADMIN'};
    return resultado;
  }
  public cerrarSesion(): void{
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('rol');
    sessionStorage.clear();
    console.log(sessionStorage.getItem('id'),sessionStorage.getItem('rol'));
  }
}
interface Datos{
  accesso: boolean;
  rol: string;
}

