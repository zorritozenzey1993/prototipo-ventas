import { finalize } from 'rxjs/operators';
import { ProductoService } from './../../../servicios/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'angular-alert-module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  formulario: FormGroup | any = null;
  categorias: any[]=[
    /*{id: 1, descripcion: 'Cat1'},
    {id: 2, descripcion: 'Cat2'},
    {id: 3, descripcion: 'Cat3'},
    {id: 4, descripcion: 'Cat4'},
    {id: 5, descripcion: 'Cat5'}*/
  ];
  constructor(
    private form: FormBuilder,
    private productoService: ProductoService,
    private spinner: NgxSpinnerService,
    private alerta: MessageService) {
    this.formulario = this.form.group({
      categoria: [null, Validators.required],
      nombre: [null, Validators.required],
      codigo: [null, Validators.required],
      cantidad: [null, Validators.required],
      precioUnitario: [null, Validators.required],
      precio: [null, Validators.required],
      tienda: [null, Validators.required],
      descripcion: [null, Validators.required],
    });
    //this.alerta.setConfig();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.productoService.categorias().pipe(
      finalize(
        ()=>{
          this.spinner.hide()
        }
      )
    ).subscribe(
      res=>{
        res.forEach((c: any) => {
          this.categorias.push({id: c.id, descripcion: c.nombre});
          //console.log(c);
        });
      }
    );
  }
  public registrar(f: FormGroup): void{
    console.log(f.value);
    this.spinner.show();
    let datos={
      categoria: +f.value.categoria,
      nombre: f.value.nombre,
      codigo: f.value.codigo,
      cantidad: f.value.cantidad,
      precioUnitario: +f.value.precioUnitario,
      precio: +f.value.precio,
      tienda: f.value.tienda,
      descripcion: f.value.descripcion
    };
    this.productoService.registrar(datos).pipe(
      finalize(
        ()=>{
          this.spinner.hide();
        }
      )
    ).subscribe(
      res=> {
        this.alerta.add({detail:res.mensaje,severity:'success'});
        this.formulario.reset();
      },
      err =>{
        console.log(err);
        this.alerta.add({detail:err.error.mensaje,severity:'error'});
      }
    );
  }
}
