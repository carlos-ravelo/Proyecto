import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ClientesService} from './servicios/clientes.service'
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import {ListaPrestamosComponent} from './components/lista-prestamos/lista-prestamos.component';
import { AppRoutingModule } from './app-routing.module';
import { DetallePrestamoComponent } from './components/detalle-prestamo/detalle-prestamo.component';

//HTTP suport
import{HttpClientModule} from'@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './clases/InMemoryDataService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { FormPrestamosComponent } from './components/form-prestamos/form-prestamos.component';
import { FormMovimientoComponent } from './components/form-movimiento/form-movimiento.component';
import { MenusComponent } from './components/menus/menus.component';
import { ListaMovimientosComponent } from './components/lista-movimientos/lista-movimientos.component';
import { LoginComponent } from './components/login/login.component';
import { MovimientosPorPrestamoComponent } from './components/movimientos-por-prestamo/movimientos-por-prestamo.component';

//Firebase
import {DataFirebaseService} from './servicios/data-firebase.service'
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CalculadoraPrestamosComponent } from './components/calculadora-prestamos/calculadora-prestamos.component';





@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    ListaPrestamosComponent,
    DetallePrestamoComponent,
    FormClientesComponent,
    FormPrestamosComponent,
    FormMovimientoComponent,
    MenusComponent,
    ListaMovimientosComponent,
    LoginComponent,
    MovimientosPorPrestamoComponent,
    CalculadoraPrestamosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }    
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),

    
  ],
  providers: [ClientesService,AngularFireModule,DataFirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
