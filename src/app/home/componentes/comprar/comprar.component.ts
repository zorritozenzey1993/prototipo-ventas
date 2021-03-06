import { AlertsService } from 'angular-alert-module';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../servicios/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  producto: any;
  formulario:FormGroup | any;
  constructor(
    private parametrosRuta: ActivatedRoute,
    private productoService:ProductoService,
    private form: FormBuilder,
    private spinner: NgxSpinnerService,
    private alerta:MessageService,
    private enrutador: Router) {
    this.formulario=form.group({
      id:null,
      nombre:null,
      descripcion: null,
      tienda: null,
      precio: null,
      cantidad: null,
      total:null,
      cliente: [null,Validators.required],
      numero: [null,Validators.required],
      fecha:[null,Validators.required],
      cve:[null,Validators.required]
    });
    this.parametrosRuta.queryParams.subscribe(
      params =>{
        this.producto=JSON.parse(params.producto);
        this.producto.cantidad=+params.cantidad;
        console.log(this.producto);
      }
    );
  }

  ngOnInit(): void {

  }
  comprar(form: any): void{
    console.log(form.value);
    //this.spinner.show();
    let idUsu=sessionStorage.getItem('id');
    let usu=(idUsu===null)?'0':+idUsu;
    console.log('Id del usuario que compra: '+usu);
    this.productoService.comprar({idUsuario: usu,idInventario:form.value.id,cantidad:form.value.cantidad,total: +form.value.total}).pipe(
      finalize(
        ()=>{
          this.spinner.hide();
        }
      )
    ).subscribe(
      res=>{
        console.log(res);
        this.alerta.add({detail: res.mensaje,severity: 'success'});
        this.enrutador.navigate(['/', 'home', 'buscar']);
      },
      err=>{
        console.log(err);
        this.alerta.add({detail: err.error.mensaje,severity: 'error'});
      }
    );
  }
}
