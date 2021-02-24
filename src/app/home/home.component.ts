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
    this.usuario=sessionStorage.getItem('correo');
    this.rol=sessionStorage.getItem('rol');
    if(this.rol !== null){
      switch(+this.rol){
        case 1:
          this.permisos=[{nombre: 'Agregar productos', icono: 'icon_pencil-edit',ruta: '/home/agregar'},{nombre: 'Productos propios',ruta: '/home/buscar',icono: 'icon_tag'},{nombre: 'Mercado Libre',ruta: '/home/mercado-libre',icono: 'icon_tag'},{nombre: 'Amazon',ruta: '/home/amazon',icono: 'icon_search'}];
          break;
        case 2:
          this.permisos=[,{nombre: 'Productos propios',ruta: '/home/buscar',icono: 'icon_tag'},{nombre: 'Mercado Libre',ruta: '/home/mercado-libre',icono: 'icon_tag'},{nombre: 'Amazon',ruta: '/home/amazon',icono: 'icon_tag'}];
          break;
      }
    }else{
      this.enrutador.navigate(['/','login']);
    }
    console.log(this.permisos);
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
