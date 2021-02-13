import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoRequest } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }
  public registrar(p: ProductoRequest): void{

  }
}
