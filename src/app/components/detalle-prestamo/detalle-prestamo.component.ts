import { Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Prestamo, Movimiento } from '../../clases/cliente';
import { ClientesService } from '../../servicios/clientes.service';
import { DataFirebaseService } from '../../servicios/data-firebase.service'
import { Cliente } from '../../clases/cliente'


@Component({
  selector: 'app-detalle-prestamo',
  templateUrl: './detalle-prestamo.component.html',
  styleUrls: ['./detalle-prestamo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetallePrestamoComponent implements OnInit {

  @Output() prestamoActual = new EventEmitter();
  @Input() prestamo: Prestamo;

  editMode: boolean = false;
  fechaProxPago: Date;
  montoAtraso: Number;
  capitalPagado: Number;
  calculatedValues: any;
  movimiento: Movimiento;
  listaCliente: Cliente[];



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
  }

  obtenerClientes(): void {
    var subscripcion = this.db.obtenerClientes().subscribe(listaCliente => { this.listaCliente = listaCliente; subscripcion.unsubscribe(); });
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

    var subscripcion = this.db.obtenerMovimientosPorPrestamo(this.prestamo.numeroPrestamo).subscribe((listaMovimientos) => {
      var valoresCalculados = this.db.calcularValoresPrestamo(listaMovimientos, this.prestamo);
      this.prestamo.capitalPrestado = valoresCalculados.capitalPrestado;
      this.prestamo.pagadoCapital = valoresCalculados.pagadoCapital;
      this.prestamo.montoCuotas = valoresCalculados.montoCuotas;
      this.prestamo.capitalPendiente = valoresCalculados.capitalPendiente;
      this.db.modificarPrestamo(this.prestamo);
      subscripcion.unsubscribe();
      this.prestamoActual.emit(this.prestamo.numeroPrestamo);

    })

    this.toggleEditMode()
  }
  toggleEditMode() {
    this.editMode = !this.editMode
  }
  identify(index, post: Number) { return 0 }

  constructor(private clientesService: ClientesService, private db: DataFirebaseService) {
  }
  ngOnInit() {
    // this.obtenerMovimientoAmodificar();
    this.obtenerClientes();
  }

}
