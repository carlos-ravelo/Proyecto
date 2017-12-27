import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cliente } from '../../clases/cliente';
import { ClientesService } from '../../servicios/clientes.service';
import {DataFirebaseService} from '../../servicios/data-firebase.service'




@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FormClientesComponent implements OnInit {
  cliente: Cliente;
  listaBancos:String[];
  selectedValue:String;

  constructor(private clientesService: ClientesService,private db:DataFirebaseService) { }


  /*onSubmit(clientesForm:any) {
    console.log("submitted");
    this.clientesService.addCliente(this.cliente)
      .subscribe(cliente => {this.clear();});      
  }*/

  onSubmit(clientesForm:any) {
    console.log("submitted");
    this.db.insertarClientes(this.cliente);      
  }
  delCuenta() {
    this.cliente.cuentas.pop();

  };
  addCuenta() {
    this.cliente.cuentas.push({
      banco: "",
      numero: ""
    });
   
  };

  delTelefono() {
    this.cliente.telefonos.pop();

  };
  addTelefono() {
    this.cliente.telefonos.push("");

  };
  identify(index,item) {
    return 1;
  }
  ObtenerListaBancos(): void {
    this.clientesService.obtenerListaBancos().subscribe(listaBancos => { this.listaBancos = listaBancos; });
  }
  

  clear() {
    this.cliente = {
      nombre:"",
      cuentas: [{banco:"",numero:""},
        
      ],
      telefonos: ["",
      ]
    };
  }
  ngOnInit() {
    this.clear();
    this.ObtenerListaBancos();
 
  

  }

}
