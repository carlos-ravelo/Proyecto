import { Component, OnInit, ViewEncapsulation,Input } from '@angular/core';
import {Prestamo} from '../../clases/cliente'
import {Movimiento} from '../../clases/cliente'
import { ClientesService } from '../../servicios/clientes.service';
import { DataFirebaseService} from '../../servicios/data-firebase.service';


@Component({
  selector: 'app-movimientos-por-prestamo',
  templateUrl: './movimientos-por-prestamo.component.html',
  styleUrls: ['./movimientos-por-prestamo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovimientosPorPrestamoComponent implements OnInit {
  @Input() prestamo:Prestamo;
  listaMovimientos:any[];
  movimientoActual:Movimiento;
  valoresCalculadosPrestamo:any;
  tipoMovimiento:string;
  seleccionarTipoMov(tipo:string){
    this.tipoMovimiento = tipo;
  }
  

  getCalculateValues() {
    this.valoresCalculadosPrestamo = this.clientesService.getLoanCalculateValues(this.prestamo);
  } 
  modificarMovimiento(){
    this.db.modificarMovimiento(this.movimientoActual);
  }

  obtenerListaMovimientos(): void {
    this.db.obtenerMovimientosPorPrestamo(this.prestamo.numeroPrestamo).subscribe(listaMovimientos => { this.listaMovimientos = listaMovimientos;
    this.movimientoActual= listaMovimientos[0] });
  }
  onSelect(movimiento: Movimiento): void {

    this.movimientoActual = movimiento;
  }
  constructor(private db:DataFirebaseService,private clientesService: ClientesService) { }
  ngOnChanges(){
    this.obtenerListaMovimientos();

  }
  ngOnInit() {
    this.obtenerListaMovimientos();
    this.getCalculateValues();
    
    
  }

}
