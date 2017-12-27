import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cliente } from '../../clases/cliente';
import { ClientesService } from '../../servicios/clientes.service';
import {DataFirebaseService} from '../../servicios/data-firebase.service'
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {

 
  listaCliente: Cliente[];
  clienteActual: Cliente;
  

  constructor(private clientesService: ClientesService,private db:DataFirebaseService) {
  }

  ngOnInit() {

    //this.getOnservableCliente();

    this.getOnservableClienteFirebase();

  }

  onSelect(cliente: Cliente): void {

    this.clienteActual = cliente;
  }
 /* getOnservableCliente(): void {
    this.clientesService.obtenerListaClientesObservable().subscribe(listaCliente => { this.listaCliente = listaCliente; this.clienteActual = this.listaCliente[0] });
  }*/
  getOnservableClienteFirebase(): void {
    this.db.obtenerClientes().subscribe(listaCliente => { const clienteActualBackUp = this.clienteActual;this.listaCliente = listaCliente;
    if (!this.clienteActual){
      this.clienteActual = this.listaCliente[0]       
    }
    else{
      this.clienteActual = this.listaCliente.find(o=>o.id === clienteActualBackUp.id);
    }
    });
  }
  borrarCliente(){
    if (this.listaCliente.length>1){
     // this.listaCliente = this.listaCliente.filter(h => h !== this.clienteActual);
      //this.clientesService.deleteCliente(this.clienteActual).subscribe();
    this.db.borrarCliente(this.clienteActual)
    this.clienteActual = this.listaCliente[0];      
    }
    else{
      alert("No puede borrar todos los Clientes");
    }  
      
  }

}

