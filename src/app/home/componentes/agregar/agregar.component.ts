import { finalize } from 'rxjs/operators';
import { ProductoService } from './../../../servicios/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'angular-alert-module';

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
  constructor(private form: FormBuilder, private productoService: ProductoService, private spinner: NgxSpinnerService, private alerta: AlertsService) {
    this.formulario = this.form.group({
      categoria: [null, Validators.required],
      nombre: [null, Validators.required],
      codigo: [null, Validators.required],
      cantidad: [null, Validators.required],
      precioUnitario: [null, Validators.required],
      precio: [null, Validators.required],
      stock: [null, Validators.required],
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
      stock: +f.value.stock,
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
        this.alerta.setMessage(res.mensaje,'success');
        this.formulario.reset();
      },
      err =>{
        console.log(err);
        this.alerta.setMessage(err.mensaje,'error');
      }
    );
  }
}
