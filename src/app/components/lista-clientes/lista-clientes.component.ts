import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cliente } from '../../clases/cliente';
import { DataFirebaseService } from '../../servicios/data-firebase.service'
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTable, MatTableDataSource } from '@angular/material';
import { FormClientesComponent } from '../form-clientes/form-clientes.component';


@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListaClientesComponent implements OnInit {
  listaCliente: Cliente[];
  clienteActual: Cliente;
  loading: boolean;
  mostrarTodo: boolean;

  constructor(private db: DataFirebaseService, public dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.obtenerClientes();

  }
  openClienteModal(): void {

    let dialogRef = this.dialog.open(FormClientesComponent, {});
    dialogRef.afterClosed().subscribe((data) => {
      if (data == "clienteCreado") {
        this.snackBar.open("Se  creo el cliente", "", { duration: 4000 })
      }

    })
  }

  onSelect(cliente: Cliente): void {
    this.clienteActual = cliente;
  }

  obtenerClientes(): void {
    this.loading = true;
    this.mostrarTodo = true;
    this.db.obtenerClientes().subscribe(listaCliente => {
      this.listaCliente = listaCliente;
      this.clienteActual = (!this.clienteActual) ? this.listaCliente[0] : this.listaCliente.find(cliente => cliente.id === this.clienteActual.id);
      this.mostrarTodo = listaCliente[0] ? true : false;
      this.loading = false;
    });
  }
  borrarCliente() {
    this.db.borrarCliente(this.clienteActual);
    this.clienteActual = this.listaCliente[0];
  }

}
