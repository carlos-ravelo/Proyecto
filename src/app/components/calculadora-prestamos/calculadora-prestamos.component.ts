import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Cliente,Movimiento,Prestamo } from '../../clases/cliente'
import { ClientesService } from '../../servicios/clientes.service';
import { DataFirebaseService } from '../../servicios/data-firebase.service'
import { CurrencyPipe } from '@angular/common';



@Component({
  selector: 'app-calculadora-prestamos',
  templateUrl: './calculadora-prestamos.component.html',
  styleUrls: ['./calculadora-prestamos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalculadoraPrestamosComponent implements OnInit {
  listaCliente: Cliente[];
  prestamo: Prestamo;
  movimiento:Movimiento;

  constructor(private currencyPipe: CurrencyPipe,private clientesService: ClientesService, private db: DataFirebaseService) {
  }
  getOnservableCliente(): void {
    this.clientesService.obtenerListaClientesObservable().subscribe(listaCliente => 
      { this.listaCliente = listaCliente; });
  }

  clear() {
    this.prestamo = {
      cliente: '',
      capitalPrestado: 0,
      tasa: 0,
      montoCuotas: 0,
      cantidadCuotas: 0,
      diaPagoMes: 0,
    }
    this.movimiento = {
      numeroPrestamo: '',
      cliente: "",
      tipoMovimiento: "",
      montoTotal: 0,
      fechaTransaccion: new Date(),
      notas: "",
      interesDelPago:0,
      capitalDelPago:0,
      montoPrestado:0
    }

  }
  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  ObtenerSiguientePrestamo() {

    this.db.ObtenerSiguientePrestamo().subscribe(ultimoValor => {
      if (ultimoValor[0]) {
        var intermedio: number;
        intermedio = parseInt(ultimoValor[0].numeroPrestamo, 10) + 1;
        this.prestamo.numeroPrestamo = this.pad(intermedio, 5, "0");
      }
      else {
        this.prestamo.numeroPrestamo = "00001"
      }

    })

  }
  calcularMontoCuota(){
    if(this.prestamo.capitalPrestado>0&&this.prestamo.tasa>0&&this.prestamo.cantidadCuotas>0){
  let r = this.prestamo.tasa/12/100;
  let pv = this.prestamo.capitalPrestado;
  let n = this.prestamo.cantidadCuotas * -1
  this.prestamo.montoCuotas = parseFloat((r*(pv)/(1-Math.pow((1+r),n))*100/100).toFixed(2));
  }}

  insertarMovimiento(){
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
    this.getOnservableCliente();
    this.clear();
    this.ObtenerSiguientePrestamo();
    
  }

  onSubmit() {
    console.log("submitted");
    this.db.insertarPrestamos(this.prestamo);
    this.insertarMovimiento();
    this.clear();

  
}



}