import { Component, OnInit, ViewEncapsulation,Input } from '@angular/core';
import { Prestamo,Movimiento } from '../../clases/cliente';
import { DataFirebaseService } from '../../servicios/data-firebase.service';


@Component({
  selector: 'app-form-movimiento',
  templateUrl: './form-movimiento.component.html',
  styleUrls: ['./form-movimiento.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormMovimientoComponent implements OnInit {
@Input() prestamo:Prestamo;
@Input() tipoMovimiento:string;
movimiento:Movimiento;

constructor( private db: DataFirebaseService) { }
  ngOnInit() {
    this.movimiento = {
      numeroPrestamo: this.prestamo.numeroPrestamo,
      cliente: this.prestamo.cliente,
      tipoMovimiento: "",
      montoTotal: 0,
      fechaTransaccion: new Date(),
      notas: "",
      interesDelPago:0,
      capitalDelPago:0,
      montoPrestado:0
    }
  }
insertarMovimiento(){
  this.movimiento.tipoMovimiento = this.tipoMovimiento;
  this.db.insertarMovimiento(this.movimiento)
  
}
}
