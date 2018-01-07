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
  capitalPendiente: Number;
  montoAtraso: Number;
  capitalPagado: Number;
  calculatedValues:any;
  movimiento:Movimiento;
  movimientoAmodificar:Movimiento;

  
  getMovimientoAmodificar(){
    this.db.obtenerMovimientoInicial(this.prestamo).subscribe(movimiento=>{
      this.movimientoAmodificar = movimiento[0]
      this.movimiento = movimiento[0]
      if (!this.movimiento){
        this.movimiento = {
          numeroPrestamo: '',
          cliente: "",
          tipoMovimiento: "",
          montoTotal: 0,
          notas: "",
          interesDelPago:0,
          capitalDelPago:0,
          montoPrestado:0,
          fechaTransaccion:new Date()

        }
      }
    })
  }
  save(): void {
    this.movimiento.numeroPrestamo = this.prestamo.numeroPrestamo;
    this.movimiento.cliente = this.prestamo.cliente;
    this.movimiento.tipoMovimiento = "inicial";
    this.movimiento.montoTotal = this.prestamo.capitalPrestado;
    this.movimiento.montoPrestado = this.prestamo.capitalPrestado;
    this.movimiento.fechaTransaccion = this.prestamo.fechaInicio;
    this.movimiento.notas = "Entrada automatica"
    this.db.modificarPrestamo(this.prestamo,this.movimiento);
    if (this.movimiento.id){
    this.db.modificarMovimiento(this.movimiento);
  }
  else{
    this.db.insertarMovimiento(this.movimiento);
  }
    this.toggleEditMode()
  }
  toggleEditMode() {
    this.editMode = !this.editMode
  }
  identify(index, post: Number) { return 0 }

  constructor(private clientesService: ClientesService,private db: DataFirebaseService) {
  }
  ngOnInit() {
    this.getMovimientoAmodificar();

    
  }

}
