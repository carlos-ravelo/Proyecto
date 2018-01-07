import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraPrestamosComponent } from './calculadora-prestamos.component';

describe('CalculadoraPrestamosComponent', () => {
  let component: CalculadoraPrestamosComponent;
  let fixture: ComponentFixture<CalculadoraPrestamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculadoraPrestamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadoraPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
