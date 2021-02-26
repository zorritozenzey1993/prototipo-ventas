import { finalize } from 'rxjs/operators';
import { ProductoService } from './../../../servicios/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'angular-alert-module';
import { ProtractorExpectedConditions } from 'protractor';
import { MessageService } from 'primeng/api';
import { isNumeric } from 'jquery';

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
    private alerta: MessageService
  ) {
    this.formulario = this.form.group({
      cadena: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    sessionStorage.setItem('carrito', JSON.stringify([]));
  }
  public buscar(f: FormGroup) {
    this.productos = [];
    console.log("Producto a buscar: " + f.value.cadena);
    this.spinner.show();
    this.productosService.buscar(f.value.cadena,'PROPIA').pipe(
      finalize(() => {
        this.spinner.hide();
      })
    ).subscribe(res => {
      console.log(res);
      res.forEach((p: any) => {
        let nom_tienda='';
        switch(p.tienda){
          case 'PROPIA':
            nom_tienda='Propia';
            break;
          case 'MERCADO_LIBRE':
            nom_tienda='Mercado Libre';
            break;
          case 'AMAZON':
            nom_tienda='Amazon';
            break;
        }
        this.productos.push({ id: p.id, nombre: p.nombre, descripcion: p.descripcion, precio: p.precio,stock:p.stock,tienda:nom_tienda});
      });
      /*this.productos=[
        {id:1, nombre: "Producto 1", descripcion: "Descripcion 1", precio: 100},
        {id:2, nombre: "Producto 2", descripcion: "Descripcion 2", precio: 101},
        {id:3, nombre: "Producto 3", descripcion: "Descripcion 3", precio: 102},
        {id:4, nombre: "Producto 4", descripcion: "Descripcion 4", precio: 103},
        {id:5, nombre: "Producto 5", descripcion: "Descripcion 5", precio: 104}
      ];*/
    },
      err => {
        this.alerta.add({ detail: err.error.mensaje, severity: 'error' });
      });
  }
  agregarCarrito(producto: any, cantidad: any): void {
    if (+cantidad > 0) {
      let elemento = '';
      try {
        elemento += sessionStorage.getItem('carrito') === null ? '[]' : sessionStorage.getItem('carrito')
        let banExiste=false;
        const carrito = JSON.parse(elemento);
        carrito.forEach((p:any) => {
          if(p.id === producto.id){
            p.cantidad+=cantidad;
            banExiste=true;
          }
        });
        if(!banExiste){
          producto.cantidad = cantidad;
          carrito.push(producto);
        }

        sessionStorage.setItem('carrito', JSON.stringify(carrito));

        producto.stock--;
        this.alerta.add({ detail: 'Producto agregado al carrito' ,severity:'success'});
      }
      catch (e) {
        this.alerta.add({ detail: 'Hubo un error al agregar al carrito' ,severity:'error'});
      }
    }
  }
  public comprar(producto: any, cantidad: any): void {
    console.log(cantidad);
    if (+ cantidad > 0) {
      this.enrutador.navigate(['/', 'home', 'comprar'], { queryParams: { 'producto': JSON.stringify(producto), 'cantidad': cantidad } });
    }
    //this.enrutador.navigate(['/','home','comprar'],{queryParams:{'producto':JSON.stringify(producto),'cantidad':cantidad}});
  }
  verCarrito() {

    this.enrutador.navigate(['/', 'home', 'carrito']);
  }
  verValor(val: any): boolean {
    console.log(val);
    return false;
  }
}
