import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { Prestamo, Movimiento } from '../../clases/cliente';
import { DataFirebaseService } from '../../servicios/data-firebase.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

declare var $: any;
declare var jQuery: any;
import * as moment from 'moment'
import { FuncionesComunesService } from '../../servicios/funciones-comunes.service';





@Component({
  selector: 'app-form-movimiento',
  templateUrl: './form-movimiento.component.html',
  styleUrls: ['./form-movimiento.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormMovimientoComponent implements OnInit {
  @Input() prestamo: Prestamo;
  @Input() tipoMovimiento: string;
  movimiento: Movimiento;
  errorMontoPrestado: boolean
  errorInteresOCapital: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private db: DataFirebaseService,
    public dialogRef: MatDialogRef<FormMovimientoComponent>, private funcionesComunes: FuncionesComunesService) { }

  clear() {
    this.movimiento = {
      numeroPrestamo: this.prestamo.numeroPrestamo,
      cliente: this.prestamo.cliente,
      tipoMovimiento: this.data.tipoMovimiento,
      montoTotal: 0,
      fechaTransaccion: new Date(),
      fechaCorrespondiente: this.prestamo.fechaProximoPago,
      notas: "",
      interesDelPago: 0,
      capitalDelPago: 0,
      montoPrestado: 0

    }
    if (this.movimiento.tipoMovimiento == 'pago') {
      this.movimiento.interesDelPago = this.round(this.prestamo.capitalPendiente * this.prestamo.tasa / 100 / 12, 2)
      this.movimiento.capitalDelPago = this.prestamo.montoCuotas - this.movimiento.interesDelPago;
    }
  }


  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
  cambioTipoMovimiento() {
    if (this.movimiento.tipoMovimiento == 'pago') { this.movimiento.interesDelPago = this.prestamo.capitalPendiente * this.prestamo.tasa / 100 / 12 }
  }

  ngOnInit() {

    this.prestamo = this.data.prestamo;
    this.clear();

  }
  insertarMovimiento() {

    if ((this.movimiento.capitalDelPago == 0 && this.movimiento.interesDelPago == 0)
      && this.movimiento.tipoMovimiento == 'pago') {
      this.errorInteresOCapital = true;
      setTimeout(() => {
        this.errorInteresOCapital = false;
      }, 2000)
      return
    }
    if (this.movimiento.montoPrestado == 0 && this.movimiento.tipoMovimiento == 'desembolso') {
      this.errorMontoPrestado = true;
      setTimeout(() => {
        this.errorMontoPrestado = false;
      }, 2000)
      return
    }
    if (this.tipoMovimiento == 'desembolso') { this.movimiento.capitalDelPago = 0; this.movimiento.interesDelPago = 0 }
    else if (this.tipoMovimiento == 'pago') { this.movimiento.montoPrestado = 0 }
    this.db.insertarMovimiento(this.movimiento);
    var subscripcion = this.db.obtenerMovimientosPorPrestamo(this.prestamo.numeroPrestamo).subscribe((listaMovimientos) => {
      var valoresCalculados = this.funcionesComunes.calcularValoresPrestamo(listaMovimientos, this.prestamo);
      this.prestamo.capitalPrestado = valoresCalculados.capitalPrestado;
      this.prestamo.pagadoCapital = valoresCalculados.pagadoCapital;
      this.prestamo.montoCuotas = this.funcionesComunes.calcularMontoCuota(this.prestamo);
      this.prestamo.capitalPendiente = valoresCalculados.capitalPendiente;
      let a = moment(this.prestamo.fechaProximoPago);
      this.prestamo.fechaProximoPago = a.add(1, 'month').format();
      this.db.modificarPrestamo(this.prestamo);
      subscripcion.unsubscribe();
      this.clear();
    });
    this.dialogRef.close();

  }

  formatFecha(event) {
    console.log(event.value.format())
    return (event.value.format())
  }
}
