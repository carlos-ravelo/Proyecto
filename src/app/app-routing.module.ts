import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { ListaPrestamosComponent } from './components/lista-prestamos/lista-prestamos.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component'
import { FormPrestamosComponent } from './components/form-prestamos/form-prestamos.component'
import { FormMovimientoComponent } from './components/form-movimiento/form-movimiento.component'
import { ListaMovimientosComponent } from './components/lista-movimientos/lista-movimientos.component'
import { MovimientosPorPrestamoComponent } from './components/movimientos-por-prestamo/movimientos-por-prestamo.component'
import { CalculadoraPrestamosComponent } from './components/calculadora-prestamos/calculadora-prestamos.component'


const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: UserListComponent },
  { path: 'add-cliente', component: FormClientesComponent },
  { path: 'add-prestamo', component: FormPrestamosComponent },
  { path: 'movimientos', component: ListaMovimientosComponent },
  { path: 'add-movimiento', component: FormMovimientoComponent },
  { path: 'prestamos', component: ListaPrestamosComponent },
  { path: 'movimientos-por-prestamo', component: MovimientosPorPrestamoComponent },
  { path: 'calculadora-prestamos', component: CalculadoraPrestamosComponent }




]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
})
export class AppRoutingModule { }
