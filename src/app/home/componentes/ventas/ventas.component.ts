import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from './../../../servicios/producto.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  producto: any;
  formulario:FormGroup | any;
  constructor(private parametrosRuta: ActivatedRoute,private productoService:ProductoService,private form: FormBuilder) {
    this.formulario=form.group({
      nombre:null,
      descripcion: null,
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
  }
}
