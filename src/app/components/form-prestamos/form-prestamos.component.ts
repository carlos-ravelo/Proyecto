import { Component, OnInit, ViewEncapsulation, Input, Output, Inject, EventEmitter } from '@angular/core';
import { Cliente, Movimiento, Prestamo } from '../../clases/cliente'
import { ClientesService } from '../../servicios/clientes.service';
import { DataFirebaseService } from '../../servicios/data-firebase.service'
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';
/* import * as finance from 'node-finance'
 */




@Component({
  selector: 'app-form-prestamos',
  templateUrl: './form-prestamos.component.html',
  styleUrls: ['./form-prestamos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormPrestamosComponent implements OnInit {
  listaCliente: Cliente[];
  prestamo: Prestamo;
  movimiento: Movimiento;
  errorCapitalInicial: boolean = false;
  errorMontoCuotas: boolean = false;
  errorCliente: boolean = false;

  constructor(private clientesService: ClientesService, private db: DataFirebaseService, private datepipe: DatePipe, public dialogRef: MatDialogRef<FormPrestamosComponent>) {
  }
  obtenerClientes(): void {
    this.db.obtenerClientes().subscribe(listaCliente => { this.listaCliente = listaCliente; });
  }

  clear() {
    this.prestamo = {
      numeroPrestamo: '',
      cliente: 'default',
      capitalPrestado: 0,
      tasa: 0,
      montoCuotas: 0,
      cantidadCuotas: 0,
      fechaProximoPago: new Date(),
      pagadoCapital: 0,
      fechaInicio: new Date(),
      capitalPendiente: 0,

    }
    this.movimiento = {
      numeroPrestamo: '',
      cliente: '',
      tipoMovimiento: '',
      montoTotal: 0,
      fechaCorrespondiente: new Date(),
      fechaTransaccion: new Date(),
      notas: '',
      interesDelPago: 0,
      capitalDelPago: 0,
      montoPrestado: 0
    }


  }
  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  ObtenerSiguientePrestamo() {

    this.db.ObtenerSiguientePrestamo().subscribe(ultimoPrestamo => {
      if (ultimoPrestamo[0]) {
        var intermedio: number;
        ultimoPrestamo[0].numeroPrestamo = parseInt(ultimoPrestamo[0].numeroPrestamo, 10) + 1;
        this.prestamo.numeroPrestamo = this.pad(ultimoPrestamo[0].numeroPrestamo, 5, "0");
      }
      else {
        this.prestamo.numeroPrestamo = "00001"
      }

    })

  }

  insertarMovimiento() {
    this.movimiento.numeroPrestamo = this.prestamo.numeroPrestamo;
    this.movimiento.cliente = this.prestamo.cliente;
    this.movimiento.tipoMovimiento = "inicial";
    this.movimiento.montoTotal = this.prestamo.capitalPrestado;
    this.movimiento.montoPrestado = this.prestamo.capitalPrestado;
    this.movimiento.fechaTransaccion = this.prestamo.fechaInicio;
    this.movimiento.notas = "Entrada automatica"
    this.db.insertarMovimiento(this.movimiento);

  }

  ngOnInit() {

    this.obtenerClientes();
    this.clear();
    this.prestamo.fechaInicio = new Date();
    this.ObtenerSiguientePrestamo();
  }
  calcularMontoCuota() {
    if (this.prestamo.capitalPrestado > 0 && this.prestamo.tasa > 0 && this.prestamo.cantidadCuotas > 0) {
      let r = this.prestamo.tasa / 12 / 100;
      let pv = this.prestamo.capitalPrestado;
      let n = this.prestamo.cantidadCuotas * -1
      this.prestamo.montoCuotas = parseFloat((r * (pv) / (1 - Math.pow((1 + r), n)) * 100 / 100).toFixed(2));
    }
  }
  abrirModalFormClientes() {
    this.dialogRef.close("abrirModalFormCliente");
  }

  formatFecha(event) {
    console.log(event.value.format())
    return (event.value.format())
  }
  crearPrestamo() {
    // this.prestamo.fechaInicio = this.prestamo.fechaInicio;
    this.prestamo.capitalPendiente = this.prestamo.capitalPrestado;
    if (this.prestamo.cliente == "default" || this.prestamo.cliente == "") { this.errorCliente = true; setTimeout(() => { this.errorCliente = false; }, 2000); return; }
    if (this.prestamo.capitalPrestado == 0) { this.errorCapitalInicial = true; setTimeout(() => { this.errorCapitalInicial = false; }, 2000); return; }
    if (this.prestamo.montoCuotas == 0) { this.errorMontoCuotas = true; setTimeout(() => { this.errorMontoCuotas = false; }, 2000); return; }
    this.db.insertarPrestamos(this.prestamo);
    this.insertarMovimiento();
    this.clear();
    this.dialogRef.close("prestamoCreado");


  }
}
