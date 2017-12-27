import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Cliente } from '../../clases/cliente'
import { ClientesService } from '../../servicios/clientes.service';
import { Location } from '@angular/common';
import{DataFirebaseService} from '../../servicios/data-firebase.service'


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {

  listaBancos: String[];
  editMode: boolean = false;
  @Input() cliente: Cliente;

  save(): void {
   // this.clientesService.updateCliente(this.cliente).subscribe(() => this.toggleEditMode());;
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
      banco: "",
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
