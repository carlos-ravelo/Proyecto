import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Cliente } from '../../clases/cliente'
import { ClientesService } from '../../servicios/clientes.service';
import { Location } from '@angular/common';
import{DataFirebaseService} from '../../servicios/data-firebase.service'


@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetalleClienteComponent implements OnInit {

  listaBancos: String[];
  editMode: boolean = false;
  @Input() cliente: Cliente;

  save(): void {

    //Borramos los campos Vacios
    this.cliente.cuentas = this.cliente.cuentas.filter(function(e) {  if (e.banco!="default"){ return e}})
    this.cliente.telefonos = this.cliente.telefonos.filter(function(e) {   return e!=""})

   this.db.modificarCliente(this.cliente);
   this.toggleEditMode();
  }
  goBack(): void {
    this.location.back();
  }

  toggleEditMode() {
    this.editMode = !this.editMode
  }

  identify(index, post: Number) { return 0 }

  constructor(private clientesService: ClientesService, private location: Location,private db:DataFirebaseService) {
  }

  ngOnInit() {
    this.ObtenerListaBancos();

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
  delTelefonoIndex(index: number) {
    this.cliente.telefonos.splice(index, 1);

  };
  addTelefono() {
    this.cliente.telefonos.push("");

  };
  ObtenerListaBancos(): void {
    this.clientesService.obtenerListaBancos().subscribe(listaBancos => { this.listaBancos = listaBancos; });
  }


}
