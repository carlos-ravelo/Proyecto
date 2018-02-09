import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cliente } from '../../clases/cliente';
import { DataFirebaseService } from '../../servicios/data-firebase.service'
import { Observable } from 'rxjs/Observable';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
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
  loading:boolean;


  constructor(private db: DataFirebaseService,public dialog: MatDialog) {
  }

  ngOnInit() {
    this.obtenerClientes();

  }
  openClienteModal(): void {
    let dialogRef = this.dialog.open(FormClientesComponent, {       });}

  onSelect(cliente: Cliente): void {
    this.clienteActual = cliente;
  }

  obtenerClientes(): void {
    this.loading = true;
    this.db.obtenerClientes().subscribe(listaCliente => {
      const clienteActualBackUp = this.clienteActual; this.listaCliente = listaCliente;
      if (!this.clienteActual) {
        this.clienteActual = this.listaCliente[0]
      }
      else {
        this.clienteActual = this.listaCliente.find(o => o.id === clienteActualBackUp.id);
      }
      this.loading = false;

    });
  }
  borrarCliente() {
    if (this.listaCliente.length > 1) {
      this.db.borrarCliente(this.clienteActual)
      this.clienteActual = this.listaCliente[0];
    }
    else {
      alert("No puede borrar todos los Clientes");
    }

  }

}

