import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ClientesService} from './servicios/clientes.service'
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Routes, RouterModule,ActivatedRoute} from '@angular/router';
import { AppComponent } from './app.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
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
import { CurrencyPipe,DatePipe } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import {CanActivateviaAuthGuardService} from './servicios/can-activatevia-auth-guard.service'

//NGX-Bootstrap
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

//Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import { ModificarMovimientoComponent } from './components/modificar-movimiento/modificar-movimiento.component';









@NgModule({
  declarations: [
    AppComponent,
    ListaClientesComponent,
    DetalleClienteComponent,
    ListaPrestamosComponent,
    DetallePrestamoComponent,
    FormClientesComponent,
    FormPrestamosComponent,
    FormMovimientoComponent,
    MenusComponent,
    ListaMovimientosComponent,
    LoginComponent,
    MovimientosPorPrestamoComponent,
    CalculadoraPrestamosComponent,
    ModificarMovimientoComponent
  ],
  entryComponents: [
    ModificarMovimientoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }  ,
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AlertModule.forRoot(),ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule, //Angular Material Inputs
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule,
    MatMenuModule
  ],
  providers: [ClientesService,AngularFireModule,DataFirebaseService,CurrencyPipe,DatePipe,AngularFireAuth,
    CanActivateviaAuthGuardService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
