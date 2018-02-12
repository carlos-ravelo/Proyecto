import { Component, OnInit, Input } from '@angular/core';
import { Prestamo } from '../../clases/cliente'
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
  styleUrls: ['./amortizacion.component.css']
})
export class AmortizacionComponent implements OnInit {
  @Input() prestamo: Prestamo;
  displayedColumns = ['position', 'interes', 'capital', 'saldo'];
  dataSource = new MatTableDataSource();
  calendario: any[];
  constructor() { }

  calcularCalendario(loan_amount, interest_rate, payments_per_year, years, payment) {
    var schedule = [];
    var remaining = loan_amount;
    var number_of_payments = payments_per_year * years;

    for (var i = 1; i <= number_of_payments; i++) {
      var interest = remaining * (interest_rate / 100 / payments_per_year);
      var principle = (payment - interest);
      remaining = remaining - principle
      var row = [i, principle > 0 ? (principle < payment ? principle : payment) : 0, interest > 0 ? interest : 0, remaining > 0 ? remaining : 0];
      schedule.push(row);
      // remaining -= principle
    }
    return schedule;
  }

  calcularPmt(rate, nper, pv) {
    var pvif, pmt;

    pvif = Math.pow(1 + rate, nper);
    pmt = rate / (pvif - 1) * -(pv * pvif);

    return pmt;
  }

  ngOnChanges(changes) {
    this.calendario = this.calcularCalendario(
      this.prestamo.capitalPendiente,
      this.prestamo.tasa,
      12,
      this.prestamo.cantidadCuotas / 12,
      this.prestamo.montoCuotas
    );

    this.dataSource.data = this.calendario;
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.


  }
  ngOnInit() {
    this.calendario = this.calcularCalendario(
      this.prestamo.capitalPendiente,
      this.prestamo.tasa,
      12,
      this.prestamo.cantidadCuotas / 12,
      this.prestamo.montoCuotas
    );

    this.dataSource.data = this.calendario;
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.


  }

}
