import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'angular-alert-module';
import { ProductoService } from './../../../servicios/producto.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventas: any[]=[];
  total: number=0;
  constructor(
    private productoService: ProductoService,
    private alerta: MessageService,
    private spinner: NgxSpinnerService
    ) {

    }

  ngOnInit(): void {
    this.spinner.show();
    this.productoService.ventasPorUsuario().pipe(
      finalize(
        () => {
          this.spinner.hide();
        }
      )
    ).subscribe(
      res => {
        console.log(res);
        this.ventas=res;
        this.ventas.forEach(v=>{
          this.total+=v.totalVendido;
        });
      },
      err => {
        this.alerta.add({detail: err.error.mensaje,severity: 'error'});
      }
    );
  }

}
