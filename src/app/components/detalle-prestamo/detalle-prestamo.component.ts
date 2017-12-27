import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Prestamo } from '../../clases/cliente';
import { ClientesService } from '../../servicios/clientes.service';


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

  getCalculateValues() {
    this.calculatedValues = this.clientesService.getLoanCalculateValues(this.prestamo);
  }
  save(): void {
     this.clientesService.updatePrestamo(this.prestamo).subscribe(() => this.toggleEditMode());;

  }
  toggleEditMode() {
    this.editMode = !this.editMode
  }
  identify(index, post: Number) { return 0 }

  constructor(private clientesService: ClientesService) {
  }
  ngOnInit() {
    this.getCalculateValues();
  }

}
