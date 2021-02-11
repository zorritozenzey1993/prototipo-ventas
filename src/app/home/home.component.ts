import { LoginService } from './../servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: string | null = null;
  rol: string | null = null;
  permisos: any[] | null = null;
  oculto: boolean= false;

  constructor(
    private parametrosRuta: ActivatedRoute,
    private loginService: LoginService,
    private enrutador: Router
    ) {
    /*this.parametrosRuta.queryParams.subscribe(
      params =>{
        console.log(params);
        this.usuario=params.usuario;
      }
    );*/

  }

  ngOnInit(): void {
    this.usuario=sessionStorage.getItem('id') !== null?sessionStorage.getItem('id'):'';
    this.rol=sessionStorage.getItem('rol') !== null?sessionStorage.getItem('rol'):'';
    if(this.rol !== null){
      switch(this.rol){
        case 'ADMIN':
          this.permisos=[{nombre: 'Agregar productos', icono: 'icon_pencil-edit',ruta: '/home/admin/agregar'},{nombre: 'Ver ventas',icono: 'icon_currency',ruta: '/home/admin/ventas'}];
          break;
        case 'CLIENTE':
          this.permisos=[{nombre: 'Buscar productos',icono: 'icon_search',ruta: '/home/cliente/buscar'}];
          break;
      }
    }
  }
  ocultarMenu(e: any): void{
    //if(this.oculto){
      this.oculto=!this.oculto;
    //}
  }
  cerrarSesion(e: any): void{
    this.loginService.cerrarSesion();
    //this.enrutador.navigate(['/','login']);

  }
}
