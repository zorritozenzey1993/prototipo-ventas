import { isNumeric } from 'jquery';
import { finalize } from 'rxjs/operators';
import { ProductoService } from './../../../servicios/producto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  realizarPago=false;
  formulario: FormGroup | any = null;
  totalAPagar: number=0;
  constructor(
    private form: FormBuilder,
    private spinner: NgxSpinnerService,
    private alerta: MessageService,
    private productoService:ProductoService,
    private enrutador: Router
    ) {
      this.formulario=this.form.group({
        total: null,
        cliente: [null,Validators.required],
        numero: [null,Validators.required],
        fecha:[null,Validators.required],
        cve:[null,Validators.required]
      });
    }
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
    let i=0;
    let proAQuitar=0;
    this.productos.forEach(pr=>{
      if(p.id === pr.id){
        proAQuitar=i;
      }
      i++;
    });
    this.productos.splice(proAQuitar,1);
    sessionStorage.setItem('carrito', JSON.stringify(this.productos));
  }
  public realizarCompra(): void{
    this.realizarPago=true;
    this.productos.forEach(p=>{
      this.totalAPagar+= +p.precio * +p.cantidad;
    });
  }
  public comprar(form: FormGroup): void{
    let respuestas: Observable<any>[]=[];
    let datos :any[]=[];
    this.spinner.show();
    let idUsu=sessionStorage.getItem('id') !== null;
    let usu=+idUsu;
    this.productos.forEach(p=>{
      respuestas.push(this.productoService.comprar({idUsuario: usu,idInventario:p.id,cantidad:p.cantidad,total: +p.precio * + p.cantidad}));
    });
    let errores=0;
    let buenos=0;
    forkJoin(respuestas).subscribe(
      res=>{
        console.log(res);
        res.forEach(r=>{
          if(isNumeric(r) && +r>204){
            errores++;
          }else{
            buenos++;
          }
        });
      },err=>{

      },()=>{
        this.spinner.hide();
        if(buenos>0 && errores === 0){
          this.alerta.add({detail: 'Todos los productos fueron comprados',severity: 'success'});
          sessionStorage.setItem('carrito',JSON.stringify([]));
        }else if(buenos===0 && errores > 0){
          this.alerta.add({detail: 'Ninguno de los productos fue comprado',severity: 'error'});
        }else if(buenos>0 && errores > 0){
          this.alerta.add({detail: buenos+' productos fueron comprados y '+errores+' no',severity: 'warn'});
          this.enrutador.navigate(['/', 'home', 'buscar']);
        }

      }
    );
  }
}
