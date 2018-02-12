import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { ListaPrestamosComponent } from './components/lista-prestamos/lista-prestamos.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component'
import { FormPrestamosComponent } from './components/form-prestamos/form-prestamos.component'
import { FormMovimientoComponent } from './components/form-movimiento/form-movimiento.component'
import { MovimientosPorPrestamoComponent } from './components/movimientos-por-prestamo/movimientos-por-prestamo.component'
import { LoginComponent } from './components/login/login.component'
import { CanActivateviaAuthGuardService } from './servicios/can-activatevia-auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ListaClientesComponent, canActivate: [CanActivateviaAuthGuardService] },
  { path: 'add-cliente', component: FormClientesComponent, canActivate: [CanActivateviaAuthGuardService] },
  { path: 'add-prestamo', component: FormPrestamosComponent, canActivate: [CanActivateviaAuthGuardService] },
  { path: 'add-movimiento', component: FormMovimientoComponent, canActivate: [CanActivateviaAuthGuardService] },
  { path: 'prestamos', component: ListaPrestamosComponent, canActivate: [CanActivateviaAuthGuardService] },
  { path: 'movimientos-por-prestamo', component: MovimientosPorPrestamoComponent, canActivate: [CanActivateviaAuthGuardService] },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
})
export class AppRoutingModule { }
