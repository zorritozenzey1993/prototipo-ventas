import { ProductoService } from './../../../servicios/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  formulario: FormGroup | any = null;
  productos: any[] = [];
  constructor(
    private form: FormBuilder,
    private productosService: ProductoService,
    private enrutador: Router
    ) {
    this.formulario= this.form.group({
      cadena: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    sessionStorage.setItem('carrito',JSON.stringify([]));
  }
  public buscar(f: FormGroup){
    console.log("Productos");
    //this.productosService.buscar(f.value.cadenaABuscar).subscribe(res => {

      this.productos=[
        {id:1, nombre: "Producto 1", descripcion: "Descripcion 1", precio: 100},
        {id:2, nombre: "Producto 2", descripcion: "Descripcion 2", precio: 101},
        {id:3, nombre: "Producto 3", descripcion: "Descripcion 3", precio: 102},
        {id:4, nombre: "Producto 4", descripcion: "Descripcion 4", precio: 103},
        {id:5, nombre: "Producto 5", descripcion: "Descripcion 5", precio: 104}
      ];
    //});
  }
  agregarCarrito(producto: any, cantidad: any): void{
    let elemento='';
    elemento+=sessionStorage.getItem('carrito') === null?'[]':sessionStorage.getItem('carrito')
    //const carrito='';
    const carrito = JSON.parse(elemento);
    producto.cantidad=cantidad;
    carrito.push(producto);
    sessionStorage.setItem('carrito',JSON.stringify(carrito));
  }
  public comprar(producto: any, cantidad: any): void{
    console.log(producto,cantidad);
  }
  verCarrito(){
    this.enrutador.navigate(['/','home','cliente','carrito']);
  }
}
