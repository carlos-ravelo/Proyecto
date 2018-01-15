import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cliente } from '../../clases/cliente';
import { ClientesService } from '../../servicios/clientes.service';
import { DataFirebaseService } from '../../servicios/data-firebase.service'
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListaClientesComponent implements OnInit {
  listaCliente: Cliente[];
  clienteActual: Cliente;

  constructor(private db: DataFirebaseService) {
  }

  ngOnInit() {
    this.obtenerClientes();

  }

  onSelect(cliente: Cliente): void {
    this.clienteActual = cliente;
  }

  obtenerClientes(): void {
    this.db.obtenerClientes().subscribe(listaCliente => {
      const clienteActualBackUp = this.clienteActual; this.listaCliente = listaCliente;
      if (!this.clienteActual) {
        this.clienteActual = this.listaCliente[0]
      }
      else {
        this.clienteActual = this.listaCliente.find(o => o.id === clienteActualBackUp.id);
      }
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

