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
    return this.clientesCollection.snapshotChanges().map(actions => {
     return actions.map(a => {
       const data = a.payload.doc.data() as Prestamo;
       const id = a.payload.doc.id;
       return { id, ...data };
     })

   })
 }
  insertarClientes(cliente: Cliente) {
    this.clientesCollection.add(cliente);
    console.log("se inserto bien el cliente");
  }
  insertarPrestamos(prestamo: Prestamo) {
    this.prestamosCollection.add(prestamo);
    console.log("se inserto bien el Prestamo");
  }
  insertarPrestamosMasivo(prestamo:Prestamo[]) {
    for(let i=0;i<prestamo.length;i++){
    this.prestamosCollection.add(prestamo[i]);
    console.log("se inserto bien el Prestamo");
  }}
  
  borrarCliente(cliente: Cliente) {
    this.clienteDoc = this.db.doc(`/clientes/${cliente.id}`);
    this.clienteDoc.delete();
  }
  modificarCliente(cliente:Cliente){
    this.clienteDoc = this.db.doc(`/clientes/${cliente.id}`);
  this.clienteDoc.update(cliente);
  }

}
