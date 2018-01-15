import { Component, OnInit, ViewEncapsulation, Input,Output,EventEmitter } from '@angular/core';
import { Prestamo, Movimiento } from '../../clases/cliente';
import { DataFirebaseService } from '../../servicios/data-firebase.service';


@Component({
  selector: 'app-form-movimiento',
  templateUrl: './form-movimiento.component.html',
  styleUrls: ['./form-movimiento.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormMovimientoComponent implements OnInit {
  @Input() prestamo: Prestamo;
  @Input() tipoMovimiento: string;
  @Output() cerrarModal:EventEmitter<string>;
  movimiento: Movimiento;
  errorMontoPrestado: boolean
  errorInteresOCapital: boolean;

  constructor(private db: DataFirebaseService) { }

  clear() {

    this.movimiento = {
      numeroPrestamo: this.prestamo.numeroPrestamo,
      cliente: this.prestamo.cliente,
      tipoMovimiento: this.tipoMovimiento,
      montoTotal: 0,
      fechaTransaccion: new Date(),
      notas: "",
      interesDelPago: 0,
      capitalDelPago: 0,
      montoPrestado: 0

    }


  }

  ngOnInit() {
    this.clear();
    if (this.tipoMovimiento == 'pago') { this.movimiento.interesDelPago = this.prestamo.capitalPendiente * this.prestamo.tasa / 100 / 12 }


  }
  insertarMovimiento() {
   /*  if ((this.movimiento.capitalDelPago == 0 || this.movimiento.interesDelPago == 0) 
    && this.movimiento.tipoMovimiento == 'pago') {
      this.errorInteresOCapital = true;
      setTimeout(() => {
        this.errorInteresOCapital = false;
        return
      }, 2000)

    }
      if (this.movimiento.montoPrestado == 0 && this.movimiento.tipoMovimiento == 'desembolso') {
        this.errorInteresOCapital = true;
        setTimeout(() => {
          this.errorInteresOCapital = false;

        }, 2000)
        return
      } */
      this.movimiento.tipoMovimiento = this.tipoMovimiento;
      this.db.insertarMovimiento(this.movimiento);
      this.db.obtenerMovimientosPorPrestamo(this.prestamo.numeroPrestamo).subscribe((listaMovimientos) => {
        var valoresCalculados = this.db.calcularValoresPrestamo(listaMovimientos, this.prestamo);
        this.prestamo.capitalPrestado = valoresCalculados.capitalPrestado;
        this.prestamo.pagadoCapital = valoresCalculados.pagadoCapital;
        this.prestamo.montoCuotas = valoresCalculados.montoCuotas;
        this.prestamo.capitalPendiente = valoresCalculados.capitalPendiente;
        this.db.modificarPrestamo(this.prestamo);
        this.cerrarModal = new EventEmitter;
        this.cerrarModal.emit("hola");
      });

    }
  }
