import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoRequest } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http: HttpClient) { }
  public registrar(p: any): Observable<any>{
    return this.http.post<any>('/micro-productos/productos/registro',p);
  }
  public buscar(cad: string): Observable<any>{
    return this.http.post<any>('/micro-productos/productos/buscar',{cadena:cad});
  }
  public categorias(): Observable<any>{
    return this.http.get<any>('/micro-productos/productos/categorias');
  }
  public comprar(p: any): Observable<any>{
    return this.http.post<any>('/micro-productos/productos/comprar',p);
  }
  public comprarVarios(productos: any[]): Observable<any>{
    return this.http.post<any>('/micro-productos/productos/comprarVarios',{'lista':productos});
  }
}
