import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Cliente } from '../clases/cliente'
import { Prestamo } from '../clases/cliente'
import { Movimiento } from '../clases/cliente'



@Injectable()
export class DataFirebaseService {
  private clientesCollection: AngularFirestoreCollection<Cliente>;
  private prestamosCollection: AngularFirestoreCollection<Prestamo>;
  private movimientosCollection: AngularFirestoreCollection<Movimiento>;
  private clienteDoc: AngularFirestoreDocument<Cliente>;
  private prestamoDoc: AngularFirestoreDocument<Prestamo>;
  private MovimientoDoc: AngularFirestoreDocument<Movimiento>;


  constructor(public db: AngularFirestore) {
    this.clientesCollection = db.collection<Cliente>('clientes');
    this.prestamosCollection = db.collection<Prestamo>('prestamos');
    this.movimientosCollection = db.collection<Movimiento>('movimientos');
  }

  //Retorna la lista de clientes completa
  obtenerClientes(): Observable<any[]> {
    return this.clientesCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Cliente;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    })
  }

  //Retorna la lista de prestamos completa
  obtenerPrestamos(): Observable<any[]> {
    return this.prestamosCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Prestamo;
        const numeroPrestamo = a.payload.doc.id;
        return { numeroPrestamo, ...data };
      })
    })
  }

  //Retorna la lista de movimientos completa 
  obtenerMovimientos(): Observable<any> {
    return this.movimientosCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Movimiento;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    })

  }

  //Retorna el siguiente numero de prestamo disponible
  ObtenerSiguientePrestamo(): Observable<any> {
    return this.db.collection('prestamos', ref => ref.orderBy('numeroPrestamo', 'desc', ).limit(1)).valueChanges();
  }

  //Obtiene la lista de movimientos de un prestamo en especifico
  obtenerMovimientosPorPrestamo(numeroPrestamo: string): Observable<any[]> {
    return this.db.collection('movimientos', ref => ref.where('numeroPrestamo', '==', numeroPrestamo)).snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Movimiento;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
  }
  //Obtiene el movimiento inicial de un prestamo
  obtenerMovimientoInicial(prestamo: Prestamo) {
    console.log("Obteniendo movimiento inicial", prestamo)
    return this.db.collection('movimientos', ref => ref.where('numeroPrestamo', '==', prestamo.numeroPrestamo)
      .where('tipoMovimiento', '==', 'inicial'))
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Movimiento;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })

  }

  //Retorna los valores calculados de un prestamo
  calcularValoresPrestamo(movimientos: Movimiento[], prestamo: Prestamo): any {
    console.log("calculando valores de prestamo", "movimientos", movimientos)
    if (movimientos.length > 0) {
      let capitalPrestado: number = 0;
      let pagadoCapital: number = 0;
      let montoCuotas: number = 0
      for (var i = 0; i < movimientos.length; i++) {
        if (movimientos[i].montoPrestado) {
          capitalPrestado = capitalPrestado + movimientos[i].montoPrestado;
        }
        if (movimientos[i].capitalDelPago) {
          pagadoCapital = pagadoCapital + movimientos[i].capitalDelPago;
        }
      }
      let capitalPendiente = capitalPrestado - pagadoCapital;
      //Calcular Monto Cuota
      let r = prestamo.tasa / 12 / 100;
      let pv = capitalPrestado;
      let n = prestamo.cantidadCuotas * -1
      montoCuotas = parseFloat((r * (pv) / (1 - Math.pow((1 + r), n)) * 100 / 100).toFixed(2));
      return {
        capitalPrestado: capitalPrestado,
        pagadoCapital: pagadoCapital,
        montoCuotas: montoCuotas,
        capitalPendiente: capitalPendiente
      }
    }
  }


  //Inserte un cliente nuevo
  insertarClientes(cliente: Cliente) {
    this.clientesCollection.add(cliente);
    console.log("se inserto un cliente", cliente);
  }
  //Inserte un Prestamo nuevo
  insertarPrestamos(prestamo: Prestamo) {
    this.prestamosCollection.doc(prestamo.numeroPrestamo).set(prestamo)
    console.log("se inserto un prestamo", prestamo);
  }

  //Inserta un Movimiento nuevo
  insertarMovimiento(movimiento: Movimiento) {
    this.movimientosCollection.add(movimiento);
    console.log("se inserto un movimiento", movimiento);
  }

  //Inserta una lista de Prestamos nuevos
  insertarPrestamosMasivo(prestamo: Prestamo[]) {
    for (let i = 0; i < prestamo.length; i++) {
      this.prestamosCollection.add(prestamo[i]);
      console.log("se inserto un prestamo");
    }
  }

  //Borra un cliente
  borrarCliente(cliente: Cliente) {
    this.clienteDoc = this.db.doc(`/clientes/${cliente.id}`);
    this.clienteDoc.delete();
    console.log("se borro un cliente");
  }

  //Borra un prestamo
  borrarPrestamo(prestamo: Prestamo) {
    this.clienteDoc = this.db.doc(`/prestamos/${prestamo.numeroPrestamo}`);
    this.clienteDoc.delete();
    console.log("se borro un prestamo");
  }

  //Borra un movimiento
  borrarMovimiento(id: string) {
    this.clienteDoc = this.db.doc(`/movimientos/${id}`);
    this.clienteDoc.delete();
    console.log("se borro un movimiento");
  }
  borrarMovimientosPorPrestamo(prestamo: Prestamo) {
    var subscripcion = this.obtenerMovimientosPorPrestamo(prestamo.numeroPrestamo).subscribe((listaMovimientos) => {
      listaMovimientos.forEach(element => {
        this.borrarMovimiento(element.id);
        subscripcion.unsubscribe();
      });

    })
  }

  //Modifica un cliente 
  modificarCliente(cliente: any) {
    console.log("Modificando Prestamo", cliente)
    this.clienteDoc = this.db.doc(`/clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  //Modifica un Prestamo 
  modificarPrestamo(prestamo: any) {
    console.log("Modificando Prestamo", prestamo)
    this.prestamoDoc = this.db.doc(`/prestamos/${prestamo.numeroPrestamo}`);
    this.prestamoDoc.update(prestamo);
  }

  //Modifica un Movimiento 
  modificarMovimiento(movimiento: Movimiento, ) {
    console.log("modificando movimiento:", movimiento)
    this.db.doc(`/movimientos/${movimiento.id}`).update(movimiento);
  }



}
