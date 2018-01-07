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


  obtenerClientes(): Observable<any[]> {
    return this.clientesCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Cliente;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    })
  }

  obtenerPrestamos(): Observable<any[]> {
    return this.prestamosCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Prestamo;
        const numeroPrestamo = a.payload.doc.id;
        return { numeroPrestamo, ...data };
      })
    })
  }

  obtenerMovimientos(): Observable<any> {
    return this.movimientosCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Movimiento;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    })

  }

  ObtenerSiguientePrestamo(): Observable<any> {
    return this.db.collection('prestamos', ref => ref.orderBy('numeroPrestamo', 'desc', ).limit(1)).valueChanges();
  }
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
  calcularValoresPrestamo(numeroPrestamo: string) {
    console.log("calculando valores de prestamo",numeroPrestamo)
    this.obtenerMovimientosPorPrestamo(numeroPrestamo).subscribe(movimientos => {
      console.log(movimientos)
      if (movimientos.length > 0) {
        let montoPrestado: number = 0;
        let pagadoCapital:number = 0;
        for (var i = 0; i < movimientos.length; i++) {
          if (movimientos[i].montoPrestado){
          montoPrestado = montoPrestado + movimientos[i].montoPrestado;
        }
        if (movimientos[i].capitalDelPago){
          pagadoCapital = pagadoCapital + movimientos[i].capitalDelPago;
        }
        }
        console.log("monto prestado",montoPrestado,"Pagado Capital",pagadoCapital)
        this.prestamoDoc = this.db.doc(`/prestamos/${numeroPrestamo}`);
        this.prestamoDoc.update({
          capitalPrestado: montoPrestado,
          pagadoCapital: pagadoCapital

        });
      }
    })

  }

  insertarClientes(cliente: Cliente) {
    this.clientesCollection.add(cliente);
    console.log("se inserto un cliente");
  }
  insertarPrestamos(prestamo: Prestamo) {
    this.prestamosCollection.doc(prestamo.numeroPrestamo).set(prestamo)
    console.log("se inserto un prestamo");
  }
  insertarMovimiento(movimiento: Movimiento) {
    this.movimientosCollection.add(movimiento);
    console.log("se inserto un movimiento",movimiento);
    this.calcularValoresPrestamo(movimiento.numeroPrestamo);
  }
  insertarPrestamosMasivo(prestamo: Prestamo[]) {
    for (let i = 0; i < prestamo.length; i++) {
      this.prestamosCollection.add(prestamo[i]);
      console.log("se inserto un prestamo");
    }
  }

  borrarCliente(cliente: Cliente) {
    this.clienteDoc = this.db.doc(`/clientes/${cliente.id}`);
    this.clienteDoc.delete();
    console.log("se borro un cliente");

  }
  borrarPrestamo(prestamo: Prestamo) {
    this.clienteDoc = this.db.doc(`/prestamos/${prestamo.numeroPrestamo}`);
    this.clienteDoc.delete();
    console.log("se borro un prestamo");

  }
  modificarCliente(cliente: Cliente) {
    this.clienteDoc = this.db.doc(`/clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  obtenerMovimientoInicial(prestamo:Prestamo){
    return   this.db.collection('movimientos', ref => ref.where('numeroPrestamo', '==', prestamo.numeroPrestamo)
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
  modificarPrestamo(prestamo: Prestamo, movimiento: Movimiento) {
    this.prestamoDoc = this.db.doc(`/prestamos/${prestamo.numeroPrestamo}`);
    this.prestamoDoc.update(prestamo);
    //Modificar  Movimiento Inicial    
       // this.db.doc(`/movimientos/${movimiento.id}`).update(movimiento);
      
  }


  modificarMovimiento(movimiento: Movimiento) {
    this.db.doc(`/movimientos/${movimiento.id}`).update(movimiento);
    this.calcularValoresPrestamo(movimiento.numeroPrestamo);

  }

  buscarCapitalPagado(numeroPrestamo: string) {
    this.obtenerMovimientosPorPrestamo(numeroPrestamo).subscribe(movimientos => {
      let total = 0;
      for (var i = 0; i < movimientos.length; i++) {
        total = total + movimientos[i].capitalDelPago;
      }
      return total;


    })
  }

}
