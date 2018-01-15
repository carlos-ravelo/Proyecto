import { Component, OnInit, ViewEncapsulation, Input,TemplateRef } from '@angular/core';
import { Prestamo } from '../../clases/cliente'
import { Movimiento } from '../../clases/cliente'
import { ClientesService } from '../../servicios/clientes.service';
import { DataFirebaseService } from '../../servicios/data-firebase.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';




@Component({
  selector: 'app-movimientos-por-prestamo',
  templateUrl: './movimientos-por-prestamo.component.html',
  styleUrls: ['./movimientos-por-prestamo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovimientosPorPrestamoComponent implements OnInit {
  @Input() prestamo: Prestamo;
  listaMovimientos: any[];
  movimientoActual: Movimiento;
  tipoMovimiento: string;
  createFormMovimientos:boolean;
  modalRef: BsModalRef;

  seleccionarTipoMov(tipo: string) {
    this.tipoMovimiento = tipo;
    this.createFormMovimientos=true;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  borrarMovimiento() {
    if (this.movimientoActual.tipoMovimiento == 'inicial'){
      alert("no puede borrar el movimiento inicial");
      return
    }
    this.db.borrarMovimiento(this.movimientoActual.id);
    this.movimientoActual = this.listaMovimientos[0];
    this.actualizarPrestamo();

  }

  actualizarPrestamo(){
    this.db.obtenerMovimientosPorPrestamo(this.prestamo.numeroPrestamo).subscribe((listaMovimientos) => {
      var valoresCalculados = this.db.calcularValoresPrestamo(listaMovimientos, this.prestamo);
      this.prestamo.capitalPrestado = valoresCalculados.capitalPrestado;
      this.prestamo.pagadoCapital = valoresCalculados.pagadoCapital;
      this.prestamo.montoCuotas = valoresCalculados.montoCuotas;
      this.prestamo.capitalPendiente = valoresCalculados.capitalPendiente;
      this.db.modificarPrestamo(this.prestamo);
    });
    
      
  }

  modificarMovimiento() {
    this.movimientoActual.fechaTransaccion = new Date(this.movimientoActual.fechaTransaccion)
    this.db.modificarMovimiento(this.movimientoActual);
    this.actualizarPrestamo();
    }

  obtenerListaMovimientos(): void {
    this.db.obtenerMovimientosPorPrestamo(this.prestamo.numeroPrestamo).subscribe(listaMovimientos => {
      this.listaMovimientos = listaMovimientos;
      this.movimientoActual = listaMovimientos[0]
    });
  }
  onSelect(movimiento: Movimiento): void {

    this.movimientoActual = movimiento;
  }
  constructor(private db: DataFirebaseService, private clientesService: ClientesService,private modalService: BsModalService) { }
  ngOnChanges() {
    this.obtenerListaMovimientos();

  }
  cerrarModal(boton ){
    console.log("cerrando")
    boton.click();
  }


  ngOnInit() {
    this.obtenerListaMovimientos();
    this.createFormMovimientos=false;


  }

}
