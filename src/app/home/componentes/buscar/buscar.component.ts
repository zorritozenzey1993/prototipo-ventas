import { finalize } from 'rxjs/operators';
import { ProductoService } from './../../../servicios/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'angular-alert-module';
import { ProtractorExpectedConditions } from 'protractor';

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
    private enrutador: Router,
    private spinner: NgxSpinnerService,
    private alerta: AlertsService
    ) {
    this.formulario= this.form.group({
      cadena: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    sessionStorage.setItem('carrito',JSON.stringify([]));
  }
  public buscar(f: FormGroup){
    this.productos=[];
    console.log("Producto a buscar: "+f.value.cadena);
    this.spinner.show();
    this.productosService.buscar(f.value.cadena).pipe(
      finalize(()=>{
        this.spinner.hide();
      })
    ).subscribe(res => {
      console.log(res);
      res.forEach((p: any) => {
        this.productos.push({id:p.id, nombre: p.nombre, descripcion: p.descripcion, precio: p.precio});
      });
      /*this.productos=[
        {id:1, nombre: "Producto 1", descripcion: "Descripcion 1", precio: 100},
        {id:2, nombre: "Producto 2", descripcion: "Descripcion 2", precio: 101},
        {id:3, nombre: "Producto 3", descripcion: "Descripcion 3", precio: 102},
        {id:4, nombre: "Producto 4", descripcion: "Descripcion 4", precio: 103},
        {id:5, nombre: "Producto 5", descripcion: "Descripcion 5", precio: 104}
      ];*/
    },
    err=>{
      this.alerta.setMessage(err.mensaje,'error');
    });
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
    this.enrutador.navigate(['/','home','comprar'],{queryParams:{'producto':JSON.stringify(producto),'cantidad':cantidad}});
  }
  verCarrito(){
    this.enrutador.navigate(['/','home','carrito']);
  }
}
