import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Prestamo, Movimiento } from '../../clases/cliente';
import { ClientesService } from '../../servicios/clientes.service';
import { DataFirebaseService } from '../../servicios/data-firebase.service'



@Component({
  selector: 'app-detalle-prestamo',
  templateUrl: './detalle-prestamo.component.html',
  styleUrls: ['./detalle-prestamo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetallePrestamoComponent implements OnInit {


  @Input() prestamo: Prestamo;
  editMode: boolean = false;
  fechaProxPago: Date;
  montoAtraso: Number;
  capitalPagado: Number;
  calculatedValues: any;
  movimiento: Movimiento;



  obtenerMovimientoAmodificar() {
    this.db.obtenerMovimientoInicial(this.prestamo).subscribe(movimiento => {
      this.movimiento = movimiento[0];

    })
  }
  save(): void {
   
    this.movimiento.numeroPrestamo = this.prestamo.numeroPrestamo;
    this.movimiento.cliente = this.prestamo.cliente;
    this.movimiento.tipoMovimiento = "inicial";
    this.movimiento.montoTotal = this.prestamo.capitalPrestado;
    this.movimiento.fechaTransaccion = new Date(this.prestamo.fechaInicio);
    this.movimiento.notas = "Entrada automatica"
    this.prestamo.fechaInicio = new Date(this.prestamo.fechaInicio);
    this.db.modificarMovimiento(this.movimiento);

    this.db.obtenerMovimientosPorPrestamo(this.prestamo.numeroPrestamo).subscribe((listaMovimientos) => {
      var valoresCalculados = this.db.calcularValoresPrestamo(listaMovimientos, this.prestamo);
      this.prestamo.capitalPrestado = valoresCalculados.capitalPrestado;
      this.prestamo.pagadoCapital = valoresCalculados.pagadoCapital;
      this.prestamo.montoCuotas = valoresCalculados.montoCuotas;
      this.prestamo.capitalPendiente = valoresCalculados.capitalPendiente;
      this.db.modificarPrestamo(this.prestamo);

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
    this.obtenerMovimientoAmodificar();
    this.db.obtenerMovimientosPorPrestamo(this.prestamo.numeroPrestamo).subscribe((Lista) => {
    })
   
 


  }

}
