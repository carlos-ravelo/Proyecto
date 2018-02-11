import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cliente } from '../../clases/cliente';
import { ClientesService } from '../../servicios/clientes.service';
import { DataFirebaseService } from '../../servicios/data-firebase.service'

import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FormClientesComponent implements OnInit {
  cliente: Cliente;
  listaBancos: String[];
  selectedValue: String;
  errorNombre: boolean = false;

  constructor(private clientesService: ClientesService, private db: DataFirebaseService,public dialogRef: MatDialogRef<FormClientesComponent>) { }

  crearCliente() {
    if (this.cliente.nombre == '') {
      this.errorNombre = true;
      setTimeout(() => {
        this.errorNombre = false;

      }, 2000)
      return
    }
    //Borramos los campos Vacios
    this.cliente.cuentas = this.cliente.cuentas.filter(function (e) { if (e.banco != "default") { return e } })
    this.cliente.telefonos = this.cliente.telefonos.filter(function (e) { return e != "" })
    this.db.insertarClientes(this.cliente);
    this.clear();
    this.dialogRef.close("clienteCreado");
  }
  delCuenta() {
    this.cliente.cuentas.pop();
  };
  addCuenta() {
    this.cliente.cuentas.push({
      banco: "default",
      numero: ""
    });
  };

  delTelefono() {
    this.cliente.telefonos.pop();

  };
  addTelefono() {
    this.cliente.telefonos.push("");

  };
  identify(index, item) {
    return 1;
  }
  ObtenerListaBancos(): void {
    this.clientesService.obtenerListaBancos().subscribe(listaBancos => { this.listaBancos = listaBancos; });
  }

  clear() {
    this.cliente = {
      nombre: "",
      cuentas: [{ banco: "default", numero: "" },

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
