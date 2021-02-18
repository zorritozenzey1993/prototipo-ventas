import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor() { }
  productos: any[]=[];
  ngOnInit(): void {
    let elemento='';
    elemento+=sessionStorage.getItem('carrito') === null?'[]':sessionStorage.getItem('carrito')
    //const carrito='';
    const carrito = JSON.parse(elemento);
    this.productos=carrito;
  }
  quitar(p: any): void{
    console.log(p);
  }
}
