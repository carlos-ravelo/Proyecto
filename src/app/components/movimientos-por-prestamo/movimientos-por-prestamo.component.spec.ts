import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosPorPrestamoComponent } from './movimientos-por-prestamo.component';

describe('MovimientosPorPrestamoComponent', () => {
  let component: MovimientosPorPrestamoComponent;
  let fixture: ComponentFixture<MovimientosPorPrestamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientosPorPrestamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosPorPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
