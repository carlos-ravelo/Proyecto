import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Movimiento } from '../../clases/cliente'
import { ClientesService } from '../../servicios/clientes.service';

@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrls: ['./lista-movimientos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListaMovimientosComponent implements OnInit {
  listaMovimiento: Movimiento[];
  movimientoActual: Movimiento;
  constructor(private clientesService: ClientesService) { }

  getListaMovimientos(): void {
    this.clientesService.obtenerListaMovimientos().subscribe(listaMovimientos => { this.listaMovimiento = listaMovimientos; this.movimientoActual = this.listaMovimiento[0] });
  }
  borrarMovimiento() {

    if (this.listaMovimiento.length > 1) {
      this.listaMovimiento = this.listaMovimiento.filter(h => h !== this.movimientoActual);
      this.clientesService.deleteMovimiento(this.movimientoActual).subscribe();
      this.movimientoActual = this.listaMovimiento[0];
    }
    else {
      alert("No puede borrar todos los Clientes");
    }
  }

  onSelect(movimiento: Movimiento): void {

    this.movimientoActual = movimiento;
    console.log(this.movimientoActual)
  }

  ngOnInit() {
    this.getListaMovimientos();

  }



}
