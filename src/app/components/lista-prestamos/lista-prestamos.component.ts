import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import { Prestamo } from '../../clases/cliente';
import { DataFirebaseService} from '../../servicios/data-firebase.service';

@Component({
  selector: 'app-lista-prestamos',
  templateUrl: './lista-prestamos.component.html',
  styleUrls: ['./lista-prestamos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListaPrestamosComponent implements OnInit {

  listaPrestamos: Prestamo[];
  prestamoActual: Prestamo;
  opcionMenu:string;

  constructor(private db:DataFirebaseService, private clientesService: ClientesService) { }

cambiarOpcionMenu(opcion:string){
  this.opcionMenu=opcion;
}

  onSelect(prestamo: Prestamo): void {

    this.prestamoActual = prestamo;
  }

  getOnservablePrestamo(): void{
    this.clientesService.obtenerListaPrestamosObservable().subscribe(listaPrestamos=> {
      this.listaPrestamos = listaPrestamos;
      this.prestamoActual =   this.listaPrestamos[0];
      this.opcionMenu = "Detalles";
    });
  }
  borrarPrestamo(){
  if (this.listaPrestamos.length>1){
    this.listaPrestamos = this.listaPrestamos.filter(h => h !== this.prestamoActual);
    this.clientesService.deletePresamo(this.prestamoActual).subscribe();
    this.prestamoActual = this.listaPrestamos[0];  
  }
  else{
    alert("No puede borrar todos los Prestamos");
  }  

}

  ngOnInit() {
    this.getOnservablePrestamo();
    
   }

  hideDetails() {
    this.prestamoActual = undefined;
  }

}
