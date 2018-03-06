import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Movimiento } from '../../clases/cliente'
import { DataFirebaseService } from '../../servicios/data-firebase.service';




@Component({
  selector: 'app-modificar-movimiento',
  templateUrl: './modificar-movimiento.component.html',
  styleUrls: ['./modificar-movimiento.component.css']
})
export class ModificarMovimientoComponent implements OnInit {
  movimientoActual: Movimiento;
  errorMontoPrestado: boolean
  errorInteresOCapital: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private db: DataFirebaseService, public dialogRef: MatDialogRef<ModificarMovimientoComponent>) { }

  ngOnInit() {
    this.movimientoActual = this.data.movimientoActual;

  }
  modificarMovimiento() {
    if ((this.movimientoActual.capitalDelPago == 0 && this.movimientoActual.interesDelPago == 0)
      && this.movimientoActual.tipoMovimiento == 'pago') {
      this.errorInteresOCapital = true;
      setTimeout(() => {
        this.errorInteresOCapital = false;
      }, 2000)
      return
    }
    if (this.movimientoActual.montoPrestado == 0 && this.movimientoActual.tipoMovimiento == 'desembolso') {
      this.errorMontoPrestado = true;
      setTimeout(() => {
        this.errorMontoPrestado = false;
      }, 2000)
      return
    }
    if (this.movimientoActual.tipoMovimiento == 'desembolso') { this.movimientoActual.capitalDelPago = 0; this.movimientoActual.interesDelPago = 0 }
    else if (this.movimientoActual.tipoMovimiento == 'pago') { this.movimientoActual.montoPrestado = 0 }
    this.movimientoActual.fechaTransaccion = new Date(this.movimientoActual.fechaTransaccion)
    this.db.modificarMovimiento(this.movimientoActual);
    this.dialogRef.close(true);
  }

  formatFecha(event) {
    console.log(event.value.format())
    return (event.value.format())
  }


  calcularMontoTotal() {
    this.movimientoActual.montoTotal = this.movimientoActual.interesDelPago + this.movimientoActual.capitalDelPago;
  }

}
