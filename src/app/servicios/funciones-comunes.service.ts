import { Injectable } from '@angular/core';
import { Prestamo, Movimiento } from '../clases/cliente';

@Injectable()
export class FuncionesComunesService {

  constructor() { }

  calcularMontoCuota(prestamo: Prestamo) {
    if (prestamo.capitalPrestado > 0 && prestamo.tasa == 0 && prestamo.cantidadCuotas > 0) {
      return prestamo.capitalPrestado / prestamo.cantidadCuotas;
    }
    else if (prestamo.capitalPrestado > 0 && prestamo.tasa > 0 && prestamo.cantidadCuotas > 0) {
      let r = prestamo.tasa / 12 / 100;
      let pv = prestamo.capitalPendiente;
      let n = prestamo.cantidadCuotas * -1
      return parseFloat((r * (pv) / (1 - Math.pow((1 + r), n)) * 100 / 100).toFixed(2));

    }
  }

  redondear(value, places) {
    var multiplier = Math.pow(10, places);
    return (Math.round(value * multiplier) / multiplier);
  }


  //Retorna los valores calculados de un prestamo
  calcularValoresPrestamo(movimientos: Movimiento[], prestamo: Prestamo): any {
    console.log("calculando valores de prestamo", "movimientos", movimientos)
    if (movimientos.length > 0) {
      let capitalPrestado: number = 0;
      let pagadoCapital: number = 0;
      for (var i = 0; i < movimientos.length; i++) {
        if (movimientos[i].montoPrestado) {
          capitalPrestado = capitalPrestado + movimientos[i].montoPrestado;
        }
        if (movimientos[i].capitalDelPago) {
          pagadoCapital = pagadoCapital + movimientos[i].capitalDelPago;
        }
      }
      let capitalPendiente = capitalPrestado - pagadoCapital;
      return {
        capitalPrestado: capitalPrestado,
        pagadoCapital: pagadoCapital,
        capitalPendiente: capitalPendiente
      }
    }
  }
}
