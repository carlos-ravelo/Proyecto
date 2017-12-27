import { Component, OnInit, ViewEncapsulation,Input } from '@angular/core';
import {Cliente} from '../../clases/cliente'
import { ClientesService } from '../../servicios/clientes.service';
import {Prestamo} from '../../clases/cliente'
import {DataFirebaseService} from '../../servicios/data-firebase.service'

@Component({
  selector: 'app-form-prestamos',
  templateUrl: './form-prestamos.component.html',
  styleUrls: ['./form-prestamos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormPrestamosComponent implements OnInit {

  listaCliente:Cliente[];
   prestamo:Prestamo;

  constructor(private clientesService: ClientesService,private db:DataFirebaseService) {
  }
  getOnservableCliente(): void {
    this.clientesService.obtenerListaClientesObservable().subscribe(listaCliente => { this.listaCliente = listaCliente;});
  }      

  clear(){
    this.prestamo ={

      cliente: '',
      tipoInteres:"",
      capitalInicial:0,
      tasa: 0,
      montoCuotas:0,
      cantidadCuotas:0,
      diaPagoMes:0
    }

  }

  ngOnInit() {
  this.getOnservableCliente();
  this.clear();
 
  }
  


/*   onSubmit() {
    console.log("submitted");
    this.clientesService.addPrestamo(this.prestamo)
      .subscribe(prestamo => {});
      this.clear();
    }    */  
    onSubmit() {
      console.log("submitted");
      
  this.db.insertarPrestamos(this.prestamo);

}}
