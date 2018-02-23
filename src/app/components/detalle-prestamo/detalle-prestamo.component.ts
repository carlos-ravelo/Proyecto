import { Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Prestamo, Movimiento } from '../../clases/cliente';
import { ClientesService } from '../../servicios/clientes.service';
import { DataFirebaseService } from '../../servicios/data-firebase.service'
import { Cliente } from '../../clases/cliente'
import * as moment from 'moment';



@Component({
  selector: 'app-detalle-prestamo',
  templateUrl: './detalle-prestamo.component.html',
  styleUrls: ['./detalle-prestamo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetallePrestamoComponent implements OnInit {

  @Input() prestamo: Prestamo;

  editMode: boolean = false;
  //fechaProxPago: Date;
  montoAtraso: Number;
  capitalPagado: Number;
  calculatedValues: any;
  movimiento: Movimiento;
  listaCliente: Cliente[];

  constructor(private db: DataFirebaseService) {
  }

  obtenerMovimientoAmodificar() {
    var subscripcion = this.db.obtenerMovimientoInicial(this.prestamo).subscribe(movimiento => {
      this.movimiento = movimiento[0];
      console.log(movimiento[0])
      subscripcion.unsubscribe();

    })
  }
  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.obtenerMovimientoAmodificar();
    this.calculateMontoAtraso();

  }

  obtenerClientes(): void {
    var subscripcion = this.db.obtenerClientes().subscribe(listaCliente => { this.listaCliente = listaCliente; subscripcion.unsubscribe(); });
  }
  formatFecha(event) {
    return (event.value.format())
  }
  guardar(): void {

    // this.movimiento.numeroPrestamo = this.prestamo.numeroPrestamo;
    //this.movimiento.cliente = this.prestamo.cliente;
    //this.movimiento.tipoMovimiento = "inicial";
    this.movimiento.montoTotal = this.prestamo.capitalPrestado;
    this.movimiento.fechaTransaccion = new Date(this.prestamo.fechaInicio);
    this.movimiento.notas = "Entrada automatica"
    this.prestamo.fechaInicio = new Date(this.prestamo.fechaInicio);
    this.db.modificarMovimiento(this.movimiento);

    let subscripcion = this.db.obtenerMovimientosPorPrestamo(this.prestamo.numeroPrestamo).subscribe((listaMovimientos) => {
      var valoresCalculados = this.db.calcularValoresPrestamo(listaMovimientos, this.prestamo);
      this.prestamo.capitalPrestado = valoresCalculados.capitalPrestado;
      this.prestamo.pagadoCapital = valoresCalculados.pagadoCapital;
      this.prestamo.capitalPendiente = valoresCalculados.capitalPendiente;
      this.db.modificarPrestamo(this.prestamo);
      subscripcion.unsubscribe();

    })

    this.toggleEditMode()
  }
  toggleEditMode() {
    this.editMode = !this.editMode
  }
  identify(index, post: Number) { return 0 }

  calcularMontoCuota() {
    //  this.prestamo.montoCuotas = this.funcionesComunes.calcularMontoCuota(this.prestamo);
  }

  calculateMontoAtraso() {
    let fechaProximoPago = moment(this.prestamo.fechaProximoPago);
    let hoy = moment();
    let diferencia = 0;
    while (fechaProximoPago < hoy) {
      fechaProximoPago.add(1, 'month')
      diferencia++;
    }
    this.montoAtraso = diferencia * this.prestamo.capitalPendiente * this.prestamo.tasa / 100 / 12;
  }

  ngOnInit() {
    // this.obtenerMovimientoAmodificar();
    this.obtenerClientes();

  }

}
