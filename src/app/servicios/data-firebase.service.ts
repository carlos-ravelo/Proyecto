import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Cliente } from '../clases/cliente'
import { Prestamo } from '../clases/cliente'
import { Movimiento } from '../clases/cliente'
import { AngularFireAuth } from 'angularfire2/auth';



@Injectable()
export class DataFirebaseService {
  private clientesCollection: AngularFirestoreCollection<Cliente>;
  private prestamosCollection: AngularFirestoreCollection<Prestamo>;
  private movimientosCollection: AngularFirestoreCollection<Movimiento>;
  private clienteDoc: AngularFirestoreDocument<Cliente>;
  private prestamoDoc: AngularFirestoreDocument<Prestamo>;
  private MovimientoDoc: AngularFirestoreDocument<Movimiento>;


  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth,
  ) {
    this.clientesCollection = db.collection<Cliente>(`usuarios/${this.afAuth.auth.currentUser.email}/clientes`);
    this.prestamosCollection = db.collection<Prestamo>(`usuarios/${this.afAuth.auth.currentUser.email}/prestamos`);
    this.movimientosCollection = db.collection<Movimiento>(`usuarios/${this.afAuth.auth.currentUser.email}/movimientos`);
  }

  //Retorna la lista de clientes completa
  obtenerClientes(): Observable<any[]> {
    this.clientesCollection = this.db.collection<Cliente>(`usuarios/${this.afAuth.auth.currentUser.email}/clientes`);

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
    this.prestamosCollection = this.db.collection<Prestamo>(`usuarios/${this.afAuth.auth.currentUser.email}/prestamos`);

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
    this.movimientosCollection = this.db.collection<Movimiento>(`usuarios/${this.afAuth.auth.currentUser.email}/movimientos`);

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
    return this.db.collection(`usuarios/${this.afAuth.auth.currentUser.email}/prestamos`, ref => ref.orderBy('numeroPrestamo', 'desc', ).limit(1)).valueChanges();
  }

  //Obtiene la lista de movimientos de un prestamo en especifico
  obtenerMovimientosPorPrestamo(numeroPrestamo: string): Observable<any[]> {

    return this.db.collection(`usuarios/${this.afAuth.auth.currentUser.email}/movimientos`, ref => ref.where('numeroPrestamo', '==', numeroPrestamo).orderBy('fechaTransaccion', "asc")).snapshotChanges()
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
    return this.db.collection(`usuarios/${this.afAuth.auth.currentUser.email}/movimientos`, ref => ref.where('numeroPrestamo', '==', prestamo.numeroPrestamo)
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

  /*  //Retorna los valores calculados de un prestamo
   calcularValoresPrestamo(movimientos: Movimiento[], prestamo: Prestamo): any {
     console.log("calculando valores de prestamo", "movimientos", movimientos)
     if (movimientos.length > 0) {
       let capitalPrestado: number = 0;
       let pagadoCapital: number = 0;
       for (var i = 0; i < movimientos.length; i++) {
         if (movimientos[i].montoPrestado) {
           capitalPrestado = capitalPrestado + movimientos[i].montoPrestado;
         }
         if (movimientos[i].capitalDelPago) {
           pagadoCapital = pagadoCapital + movimientos[i].capitalDelPago;
         }
       }
       let capitalPendiente = capitalPrestado - pagadoCapital;
       return {
         capitalPrestado: capitalPrestado,
         pagadoCapital: pagadoCapital,
         capitalPendiente: capitalPendiente
       }
     }
   } */


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
    // this.clienteDoc = this.db.doc(`/clientes/${cliente.id}`);
    this.clienteDoc = this.clientesCollection.doc(cliente.id);
    this.clienteDoc.delete();
    console.log("se borro un cliente");
  }

  //Borra un prestamo
  borrarPrestamo(prestamo: Prestamo) {
    //this.clienteDoc = this.db.doc(`/prestamos/${prestamo.numeroPrestamo}`);
    this.prestamosCollection.doc(prestamo.numeroPrestamo).delete();
    console.log("se borro un prestamo");
  }

  //Borra un movimiento
  borrarMovimiento(id: string) {
    //this.MovimientoDoc = this.db.doc(`/movimientos/${id}`);
    this.movimientosCollection.doc(id).delete();
    //this.clienteDoc.delete();
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
    console.log("Modificando cliente", cliente)
    /*   this.clienteDoc = this.db.doc(`/clientes/${cliente.id}`);
      this.clienteDoc.update(cliente); */
    this.clientesCollection.doc(cliente.id).update(cliente);
  }

  //Modifica un Prestamo 
  modificarPrestamo(prestamo: any) {
    console.log("Modificando Prestamo", prestamo)
    /*     this.prestamoDoc = this.db.doc(`/prestamos/${prestamo.numeroPrestamo}`);
        this.prestamoDoc.update(prestamo); */
    this.prestamosCollection.doc(prestamo.numeroPrestamo).update(prestamo);

  }

  //Modifica un Movimiento 
  modificarMovimiento(movimiento: Movimiento, ) {
    /*    console.log("modificando movimiento:", movimiento)
       this.db.doc(`/movimientos/${movimiento.id}`).update(movimiento); */
    this.movimientosCollection.doc(movimiento.id).update(movimiento);
  }



}
