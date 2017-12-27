import { Component, OnInit, ViewEncapsulation,Input } from '@angular/core';
import {Prestamo} from '../../clases/cliente'
import {Movimiento} from '../../clases/cliente'
import { ClientesService } from '../../servicios/clientes.service';

@Component({
  selector: 'app-movimientos-por-prestamo',
  templateUrl: './movimientos-por-prestamo.component.html',
  styleUrls: ['./movimientos-por-prestamo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovimientosPorPrestamoComponent implements OnInit {
  @Input() prestamo:Prestamo;
  listaMovimientos:Movimiento[];
  movimientoActual:Movimiento;
  valoresCalculadosPrestamo:any;

  getCalculateValues() {
    this.valoresCalculadosPrestamo = this.clientesService.getLoanCalculateValues(this.prestamo);
  } 

  agregarMovimiento(){  }
  obtenerListaMovimientos(): void {
    this.clientesService.obtenerListaMovimientos().subscribe(listaMovimientos => { this.listaMovimientos = listaMovimientos; });
  }
  onSelect(movimiento: Movimiento): void {

    this.movimientoActual = movimiento;
    console.log(this.movimientoActual)
  }
  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.obtenerListaMovimientos();
    this.getCalculateValues();
    
  }

}
