import { ProductoService } from './../../../servicios/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  formulario: FormGroup | any = null;
  categorias: any[]=[
    {id: 1, descripcion: 'Cat1'},
    {id: 2, descripcion: 'Cat2'},
    {id: 3, descripcion: 'Cat3'},
    {id: 4, descripcion: 'Cat4'},
    {id: 5, descripcion: 'Cat5'}
  ];
  constructor(private form: FormBuilder, private productoService: ProductoService) {
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
  }

  ngOnInit(): void {}
  public registrar(f: FormGroup): void{
    console.log(f.value);
  }
}
