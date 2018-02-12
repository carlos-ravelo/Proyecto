import { Injectable } from '@angular/core';
import { Cliente } from '../clases/cliente';
import { Prestamo } from '../clases/cliente';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { Movimiento } from './../clases/cliente'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ClientesService {

  private clientesUrl = 'api/clientesData/';  // URL to web api
  private prestamosUrl = 'api/prestamosData/';
  private bancosUrl = 'api/listaBancos/';
  private movimientosUrl = 'api/movimientosData/';


  constructor(private http: HttpClient) { }

  obtenerListaClientesObservable(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clientesUrl)


  }
  obtenerListaPrestamosObservable(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.prestamosUrl)

  }
  obtenerListaBancos(): Observable<String[]> {
    return this.http.get<String[]>(this.bancosUrl)

  }
  obtenerListaMovimientos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.movimientosUrl)

  }

  updateCliente(cliente: Cliente): Observable<any> {

    return this.http.put(this.clientesUrl, cliente, httpOptions);
  }

  updatePrestamo(prestamo: Prestamo): Observable<any> {

    return this.http.put(this.prestamosUrl, prestamo, httpOptions);
  }
  updateMovimiento(movimiento: Movimiento): Observable<any> {

    return this.http.put(this.movimientosUrl, movimiento, httpOptions);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.clientesUrl, cliente, httpOptions);
  }


  addPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.prestamosUrl, prestamo, httpOptions);
  }
  addMovimiento(movimiento: Movimiento): Observable<Movimiento> {
    return this.http.post<Movimiento>(this.movimientosUrl, movimiento, httpOptions);
  }

  deleteCliente(cliente: Cliente): Observable<Cliente> {

    const id: string = cliente.id;
    const url = `${this.clientesUrl}${id}`;
    return this.http.delete<Cliente>(url, httpOptions)
  }
  deletePresamo(prestamo: Prestamo): Observable<Prestamo> {

    const id: String = prestamo.numeroPrestamo;
    const url = `${this.prestamosUrl}${id}`;
    return this.http.delete<Prestamo>(url, httpOptions)
  }
  deleteMovimiento(movimiento: Movimiento): Observable<Movimiento> {

    const id: string = movimiento.id;
    const url = `${this.movimientosUrl}${id}`;
    return this.http.delete<Movimiento>(url, httpOptions)
  }
  getLoanCalculateValues(prestamo: Prestamo) {
    return {
      fechaProxPago: '30-12-2017',
      capitalPendiente: 2000,
      montoAtraso: 300,
      capitalPagado: 1000,
      proximoInteres: 100,
      proximoCapital: 150
    }

  }
}

