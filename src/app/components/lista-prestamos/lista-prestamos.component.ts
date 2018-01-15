import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import { Prestamo, Movimiento } from '../../clases/cliente';
import { DataFirebaseService } from '../../servicios/data-firebase.service';

@Component({
  selector: 'app-lista-prestamos',
  templateUrl: './lista-prestamos.component.html',
  styleUrls: ['./lista-prestamos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListaPrestamosComponent implements OnInit {

  listaPrestamos: Prestamo[];
  prestamoActual: Prestamo;
  opcionMenu: string;
  prestamosFiltrados: Prestamo[];
  currentCapitalPagado;
  mostrarTodo:boolean;
  loading:boolean;


  constructor(private db: DataFirebaseService, private clientesService: ClientesService) { }
  cambiarOpcionMenu(opcion: string) {
    this.opcionMenu = opcion;
  }
  onSelect(prestamo: Prestamo): void {

    this.prestamoActual = prestamo;
  }
  

  ObtenerPrestamos(): void {
    this.loading = true;
    this.db.obtenerPrestamos().subscribe(listaPrestamos => {
      if(listaPrestamos.length>0){/* this.opcionMenu = "Detalles"; */this.mostrarTodo= true}
      this.listaPrestamos = listaPrestamos;
      if (!this.listaPrestamos[0]){
        this.mostrarTodo = false;
      }
      this.prestamoActual = this.listaPrestamos[0];
      this.loading = false;
      
     });
  }


  borrarPrestamo() {
    if (this.listaPrestamos.length > 1) {
      this.db.borrarPrestamo(this.prestamoActual);
      this.prestamoActual = this.listaPrestamos[0];
    }
    else {
      alert("No puede borrar todos los Prestamos");
    }
  }
  ngOnInit() {
    this.ObtenerPrestamos();
    this.mostrarTodo = true;

  }

   myFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }

 
}
